import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { verifySession } from '@/lib/auth/session';
import { hasRole } from '@/lib/auth/rbac';
import { InquiryFilters } from '@/components/admin/InquiryFilters';
import { InquiryStatusSelector } from '@/components/admin/InquiryStatusSelector';
import { CopyContactButton } from '@/components/admin/CopyContactButton';
import { InquiryPagination } from '@/components/admin/InquiryPagination';
import type { Prisma, InquiryStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

interface AdminPageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 10;
const VALID_STATUSES: Array<InquiryStatus | 'ALL'> = [
  'ALL',
  'NEW',
  'IN_REVIEW',
  'CONTACTED',
  'CLOSED',
];

export default async function AdminDashboardPage({ searchParams }: AdminPageProps) {
  // Enforce session and role verification, redirecting cleanly if unauthenticated
  const session = await verifySession();
  if (!session || !hasRole(session.user.role, 'STAFF')) {
    redirect('/admin/login');
  }

  const resolvedSearchParams = await searchParams;
  const rawStatus = (resolvedSearchParams.status || 'ALL').toUpperCase();
  const currentStatus = VALID_STATUSES.includes(rawStatus as InquiryStatus | 'ALL')
    ? rawStatus
    : 'ALL';
  const currentSearch = (resolvedSearchParams.search || '').trim();
  const currentPage = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10) || 1);

  // Build database query filters
  const where: Prisma.InquiryWhereInput = {};

  if (currentStatus !== 'ALL') {
    where.status = currentStatus as InquiryStatus;
  }

  if (currentSearch) {
    where.OR = [
      { name: { contains: currentSearch, mode: 'insensitive' } },
      { email: { contains: currentSearch, mode: 'insensitive' } },
      { location: { contains: currentSearch, mode: 'insensitive' } },
      { message: { contains: currentSearch, mode: 'insensitive' } },
    ];
  }

  let inquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    projectType: string;
    location: string;
    approximateSize: string | null;
    timeline: string;
    message: string;
    status: InquiryStatus;
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  let totalFilteredCount = 0;
  let counts = {
    all: 0,
    new: 0,
    inReview: 0,
    contacted: 0,
    closed: 0,
  };
  let dbError: string | null = null;

  try {
    // Execute count queries in parallel for high efficiency
    const [allCount, newCount, inReviewCount, contactedCount, closedCount, filteredCount] =
      await Promise.all([
        prisma.inquiry.count(),
        prisma.inquiry.count({ where: { status: 'NEW' } }),
        prisma.inquiry.count({ where: { status: 'IN_REVIEW' } }),
        prisma.inquiry.count({ where: { status: 'CONTACTED' } }),
        prisma.inquiry.count({ where: { status: 'CLOSED' } }),
        prisma.inquiry.count({ where }),
      ]);

    counts = {
      all: allCount,
      new: newCount,
      inReview: inReviewCount,
      contacted: contactedCount,
      closed: closedCount,
    };
    totalFilteredCount = filteredCount;

    // Fetch paginated inquiries
    inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });
  } catch {
    dbError = 'Database inquiries unavailable or offline in the current environment.';
  }

  const totalPages = Math.ceil(totalFilteredCount / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Overview & Intro Banner */}
      <div className="rounded border border-[#D9D4CB] bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl text-[#242321] tracking-[-0.01em]">
              Project Inquiries
            </h1>
            <p className="text-xs text-[#6F6962] leading-relaxed">
              Prospective client briefs submitted via the public contact and consultation form.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-[#FAF8F5] border border-[#D9D4CB] px-3 py-1.5 text-xs font-mono font-medium text-[#242321]">
              {counts.all} Total Leads
            </span>
            {counts.new > 0 && (
              <span className="rounded bg-[#A45D49]/10 border border-[#A45D49]/20 px-3 py-1.5 text-xs font-mono font-medium text-[#A45D49]">
                {counts.new} Unreviewed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Management Section */}
      <div className="rounded border border-[#D9D4CB] bg-white p-6 shadow-sm space-y-6">
        {/* Search and Status Filters */}
        <InquiryFilters
          currentStatus={currentStatus}
          currentSearch={currentSearch}
          counts={counts}
        />

        {/* Database Error State */}
        {dbError ? (
          <div
            role="alert"
            className="rounded border border-[#9E5D46]/20 bg-[#9E5D46]/10 p-4 text-xs text-[#9E5D46] font-sans"
          >
            {dbError}
          </div>
        ) : inquiries.length === 0 ? (
          /* Empty States */
          <div className="py-12 text-center space-y-3">
            <div className="font-serif text-lg text-[#242321]">
              {currentSearch || currentStatus !== 'ALL'
                ? 'No matching inquiries found'
                : 'No project inquiries recorded yet'}
            </div>
            <p className="text-xs text-[#6F6962] max-w-md mx-auto leading-relaxed">
              {currentSearch || currentStatus !== 'ALL'
                ? 'Try adjusting your search query or switching to a different status filter tab.'
                : 'Consultation requests submitted by prospective clients through the /contact page will appear here.'}
            </p>
            {(currentSearch || currentStatus !== 'ALL') && (
              <Link
                href="/admin"
                className="inline-block text-xs font-medium text-[#A45D49] hover:underline underline-offset-4 pt-1"
              >
                Reset all filters →
              </Link>
            )}
          </div>
        ) : (
          /* Inquiries List */
          <div className="divide-y divide-[#EFECE6]">
            {inquiries.map((inquiry) => {
              const mailtoUrl = `mailto:${inquiry.email}?subject=${encodeURIComponent(
                `Atelier Noura — Re: Consultation Request (${inquiry.projectType})`
              )}`;

              return (
                <div key={inquiry.id} className="py-5 space-y-3">
                  {/* Row 1: Client Header, Contact Actions, Status Selector, Date */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm text-[#242321]">
                          {inquiry.name}
                        </span>

                        {/* Direct Email Action */}
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={mailtoUrl}
                            className="text-xs text-[#6F6962] hover:text-[#A45D49] hover:underline transition-colors font-mono"
                            title="Compose email to prospective client"
                          >
                            &lt;{inquiry.email}&gt;
                          </a>
                          <CopyContactButton
                            value={inquiry.email}
                            ariaLabel={`Copy email address for ${inquiry.name}`}
                          />
                        </div>

                        {/* Direct Phone Action (if present) */}
                        {inquiry.phone && (
                          <div className="inline-flex items-center gap-1.5 text-xs text-[#6F6962]">
                            <span>·</span>
                            <a
                              href={`tel:${inquiry.phone}`}
                              className="text-xs text-[#6F6962] hover:text-[#A45D49] hover:underline transition-colors font-mono"
                              title="Call client phone"
                            >
                              {inquiry.phone}
                            </a>
                            <CopyContactButton
                              value={inquiry.phone}
                              ariaLabel={`Copy phone number for ${inquiry.name}`}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status & Timestamp */}
                    <div className="flex flex-wrap items-center gap-3">
                      <InquiryStatusSelector
                        inquiryId={inquiry.id}
                        initialStatus={inquiry.status}
                      />
                      <span className="text-[11px] font-mono text-[#6F6962]">
                        {new Date(inquiry.createdAt).toLocaleString('en-GB', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Metadata Pills */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6F6962]">
                    <span>
                      <strong className="font-medium text-[#242321]">Typology:</strong>{' '}
                      {inquiry.projectType}
                    </span>
                    <span>·</span>
                    <span>
                      <strong className="font-medium text-[#242321]">Location:</strong>{' '}
                      {inquiry.location}
                    </span>
                    <span>·</span>
                    <span>
                      <strong className="font-medium text-[#242321]">Timeline:</strong>{' '}
                      {inquiry.timeline}
                    </span>
                    {inquiry.approximateSize && (
                      <>
                        <span>·</span>
                        <span>
                          <strong className="font-medium text-[#242321]">Scale:</strong>{' '}
                          {inquiry.approximateSize}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Row 3: Project Brief / Message */}
                  <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#EFECE6] text-xs text-[#242321] font-sans leading-relaxed whitespace-pre-wrap">
                    {inquiry.message}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        <InquiryPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalFilteredCount}
          pageSize={PAGE_SIZE}
        />
      </div>
    </div>
  );
}
