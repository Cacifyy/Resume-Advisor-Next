import { NextResponse } from "next/server";

type JobPostingPayload = {
  close_date?: string; // YYYY-MM-DD
  company_industry?: string;
  company_location?: string;
  company_name: string;
  company_website?: string;
  description?: string;
  job_location: string;
  posted_date?: string; // YYYY-MM-DD
  requirements?: unknown[];
  title: string;
};

type JobPostingResponse = {
  job_id: number;
  message: string;
  success: boolean;
};

function isValidDateString(val?: string) {
  if (!val) return true; // optional
  // Basic YYYY-MM-DD validation
  return /^\d{4}-\d{2}-\d{2}$/.test(val);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<JobPostingPayload>;

    // Required fields validation
    const missing: string[] = [];
    if (!body.company_name) missing.push("company_name");
    if (!body.job_location) missing.push("job_location");
    if (!body.title) missing.push("title");
    if (missing.length) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missing.join(", ")}`,
          success: false,
        },
        { status: 400 }
      );
    }

    // Light format checks
    if (!isValidDateString(body.close_date) || !isValidDateString(body.posted_date)) {
      return NextResponse.json(
        {
          message: "Invalid date format. Use YYYY-MM-DD.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (body.company_website && typeof body.company_website === "string") {
      try {
        // Basic URL sanity check
        new URL(body.company_website);
      } catch {
        return NextResponse.json(
          { message: "Invalid company_website URL.", success: false },
          { status: 400 }
        );
      }
    }

    // TODO: Persist to DB. For now, mock a job_id.
    const job_id = Math.floor(Date.now() % 1_000_000);

    const resp: JobPostingResponse = {
      job_id,
      message: "Job posting created successfully",
      success: true,
    };

    return NextResponse.json(resp, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid JSON payload", success: false },
      { status: 400 }
    );
  }
}
