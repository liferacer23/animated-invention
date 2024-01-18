export default function Home() {
  return (
    <main className="flex w-10/12 h-15 mx-auto items-center justify-between  bg-white mt-3 px-44">
      <div className="w-full flex flex-col items-end gap-2 my-2">
        <h1 className="text-[22px] font-semibold text-black">Overview</h1>
        <p className="text-[16px] cursor-pointer text-greenify">
          Explore broker insights
        </p>
      </div>
    </main>
  );
}
