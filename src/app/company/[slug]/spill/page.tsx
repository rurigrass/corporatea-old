import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const { slug } = params;
  const company = await db.company.findFirst({
    where: {
      name: slug,
    },
  });

  if (!company) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Spill some tea
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            on {params.slug}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
