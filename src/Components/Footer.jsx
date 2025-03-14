

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-20">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">About Crowdcube</h2>
                        <p className="text-gray-400">Crowdcube is a crowdfunding platform that helps bring creative ideas, startups, and personal causes to life through community support.</p>
                    </div>
                    
                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="/allCampaign" className="text-gray-400 hover:text-white">All Campaigns</a></li>
                            <li><a href="/addCampaign" className="text-gray-400 hover:text-white">Add New Campaign</a></li>
                            <li><a href="/myDonation" className="text-gray-400 hover:text-white">My Donations</a></li>
                        </ul>
                    </div>
                    
                    {/* Contact Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">Contact Us</h2>
                        <p className="text-gray-400">Email: sazzadtalukdercseiu@gamil.com</p>
                        <p className="text-gray-400">Phone: +8801797 -777777</p>
                        <p className="text-gray-400">Address: 88/2 Kathaltola Road, Mirpur-2, Dhaka</p>
                    </div>
                </div>
                
                {/* Social Media & Copyright */}
                <div className="text-center mt-8 border-t border-gray-700 pt-5">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} Crowdcube. All Rights Reserved.</p>
                    <div className="flex justify-center space-x-4 mt-3">
                        <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                        <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;