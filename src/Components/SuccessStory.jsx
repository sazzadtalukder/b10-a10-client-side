import { CheckCircle } from "lucide-react";


const SuccessStory = () => {
    const successStories = [
        {
          title: "Community Garden Project",
          description: "Raised funds to build a community garden for local families.",
          raised: "15,000",
       
          image: "https://i.ibb.co.com/60kk8HWs/food-bank-garden-Eagan-MN-2175-raised-1024x683.jpg"
        },
        {
          title: "Tech for Education",
          description: "Provided laptops to underprivileged students.",
          raised: "20,000",
          image: "https://i.ibb.co.com/FLDMt1Rm/1121390-learning-opportunity.webp",
        },
        {
          title: "Animal Shelter Support",
          description: "Funded food and medical supplies for rescued animals.",
          raised: "10,000",
          image: "https://i.ibb.co.com/7tKzJxjs/kitten-in-crate.jpg",
        },
      ];
      
      const steps = [
        { title: "Sign Up & Create Account", description: "Register on the platform to start your fundraising journey." },
        { title: "Launch Your Campaign", description: "Fill out the campaign details, set a goal, and make it live for donations." },
        { title: "Share & Promote", description: "Spread the word about your campaign through social media and networks." },
        { title: "Receive Donations", description: "Donors contribute to your cause, and funds are securely processed." },
        { title: "Monitor & Engage", description: "Track your campaign progress and interact with supporters." },
        { title: "Withdraw Funds", description: "Once the campaign ends, withdraw the funds and bring your idea to life." },
      ];
    return (
        <div className="py-12 px-6 max-w-6xl mx-auto">
      {/* Success Stories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <div key={index} className="p-4 border shadow-lg rounded-lg">
              <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mt-4">{story.title}</h3>
                <p className="text-gray-600 mt-2">{story.description}</p>
                <p className="text-green-500 font-bold mt-2">Raised: ${story.raised}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">How It Works?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg shadow-md">
              <CheckCircle className="text-green-500 w-10 h-10" />
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    );
};

export default SuccessStory;