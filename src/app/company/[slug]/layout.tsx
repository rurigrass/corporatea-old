import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

const layout = async ({ params, children }: layoutProps) => {
  const session = await getAuthSession();
  const { slug } = params;

  

  const company = await db.company.findFirst({
    where: {
      name: slug,
    },
    include: {
      spills: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const follower = !session?.user
    ? undefined
    : await db.follower.findFirst({
        where: {
          company: {
            name: slug,
          },
          user: {
            // id: session.user.id
            id: session.id,
          },
        },
      });

  const isAFollower = !!follower;

  if (!company) return notFound();

  const followerCount = await db.follower.count({
    where: {
      company: {
        name: slug,
      },
    },
  });


  // console.log("SESSION ID: ", session?.user.id);
  console.log("COMPANY: ", company);

  return (
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/* TODO: Button to take us back */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>
          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3">About {slug}</p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700">
                  <time dateTime={company.createdAt.toDateString()}>
                    {format(company.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{followerCount}</div>
                </dd>
              </div>

              {company.creatorId === session?.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500">You created this</p>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
