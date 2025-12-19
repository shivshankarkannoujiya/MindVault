import { useNavigate } from "react-router-dom"; // Assuming you use react-router
import Button from "../components/Button";
import Logo from "../icons/Logo";
import XIcon from "../icons/XIcon";
import YoutubeIcon from "../icons/YoutubeIcon";
import FeatureCard from "../components/FeatureCard";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="flex justify-between items-center px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <div className="text-purple-600">
            <Logo />
          </div>
          BrainVault
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/signin")}
            varient="secondary"
            text="Login"
            className="font-medium"
          />
          <Button
            onClick={() => navigate("/signup")}
            varient="primary"
            text="Get Started"
            className="font-medium"
          />
        </div>
      </nav>

      <header className="flex flex-col items-center justify-center text-center px-4 mt-20 mb-20">
        <div className="mb-6 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium inline-block">
          ✨ Your Digital Memory, Reimagined
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 max-w-4xl leading-tight mb-6">
          Organize your <span className="text-purple-600">life</span> <br />
          and content in one place.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mb-10">
          Stop losing important links and ideas. Second Brain helps you collect,
          organize, and retrieve your digital life instantly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => navigate("/signup")}
            varient="primary"
            text="Start for Free"
            className="px-8 py-3 text-lg font-medium"
          />
          <Button
            varient="secondary"
            text="View Demo"
            className="px-8 py-3 text-lg font-medium"
          />
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">
            Everything you need to build your brain
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<XIcon />}
              title="Tweet Hoarding"
              description="Save tweets and threads instantly with one click. Never lose a valuable insight again."
            />
            <FeatureCard
              icon={<YoutubeIcon />}
              title="Video Bookmarking"
              description="Save YouTube videos and add timestamps to jump back to key moments later."
            />
            <FeatureCard
              icon={<Logo />}
              title="AI Integration"
              description="Ask your Second Brain questions and get answers based on your saved content."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            "The best way to organize my random thoughts."
          </h2>
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 bg-slate-300 rounded-full"></div>{" "}
            {/* Placeholder Avatar */}
            <div className="text-left">
              <div className="font-semibold text-slate-900">
                Abhi Kannoujiya
              </div>
              <div className="text-slate-500 text-sm">
                Software Engineer @ BrainVault
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-purple-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to clear your mind?
        </h2>
        <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
          Join 10,000+ others who are building their Brain Vault today.
        </p>
        <div className="flex justify-center">
          {/* Custom style for white button */}
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-purple-600 px-8 py-3 rounded-md font-semibold hover:bg-slate-100 transition-colors"
          >
            Get Started Now
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
