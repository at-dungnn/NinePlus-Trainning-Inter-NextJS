import { Skeleton } from "primereact/skeleton";

export default function SkeletonTable() {
    return (
        <>
            <h5>state: loading</h5>
            <Skeleton width="30rem" className="mb-2"></Skeleton>
            <Skeleton width="40rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" className="mb-2"></Skeleton>
            <Skeleton height="2rem" width="35rem" className="mb-2"></Skeleton>
            <Skeleton width="10rem" height="4rem"></Skeleton>
        </>
    );
}
