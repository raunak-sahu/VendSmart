import SkeletonCard from "@/components/dashboard/SkeletonCard";

export default function Loading() {
  return (
    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />

      </div>

      <SkeletonCard />

      <div className="grid gap-6 lg:grid-cols-2">

        <SkeletonCard />
        <SkeletonCard />

      </div>

    </div>
  );
}