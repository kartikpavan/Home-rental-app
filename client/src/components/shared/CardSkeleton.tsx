const CardSkeleton = () => {
  return (
    <section className="flex gap-10 flex-wrap py-10 items-center justify-center ">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </section>
  );
};

export default CardSkeleton;
