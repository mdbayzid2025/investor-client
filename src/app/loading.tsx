import { LoaderCircle } from "lucide-react";

const LoadingPage = () => {
  return (
    <section className="flex justify-center items-center w-full h-screen bg-white/30 backdrop-blur-lg">
      <div className="p-6">
        <LoaderCircle className="size-8 animate-spin text-primary" />
      </div>
    </section>
  );
};

export default LoadingPage;