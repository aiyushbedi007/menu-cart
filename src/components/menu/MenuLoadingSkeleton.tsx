import { SkeletonLoader } from "../skeleton-loader";

type MenuLoadingSkeletonProps = {
  numCards?: number;
};

export function MenuLoadingSkeleton({
  numCards = 4,
}: MenuLoadingSkeletonProps) {
  return (
    <>
      <SkeletonLoader
        width={200}
        height={"1em"}
        style={{ marginBottom: "var(--spacing-3)" }}
      />
      {Array.from({ length: numCards }).map((_, index) => (
        <SkeletonLoader
          key={index}
          width={400}
          height={100}
          style={{ marginBottom: "var(--spacing-2)" }}
        />
      ))}
    </>
  );
}
