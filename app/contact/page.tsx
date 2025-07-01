import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCall, IoLocation } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Resend } from "resend"

export default function ContactPage() {

  async function send(formData: FormData) {
    "use server";
    const resend = new Resend(process.env.RESEND_API_KEY);

    const dataObj = Object.fromEntries(formData.entries());
    const { name, email, subject, message } = dataObj as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    try {
      await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to: "officialparkitup@gmail.com",
        subject: "PARK It Up - Contact Form Submission",
        html: `
      <h1>Contact Form Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${(message ?? "").toString().replace(/\n/g, "<br/>")}</p>
      `,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#0a121a] text-white px-6 py-8 sm:p-10 lg:px-20 xl:px-32 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            CONTACT US
          </h1>
          <h3 className="text-gray-400 pt-3 max-w-xl mx-auto text-lg sm:text-xl md:text-2xl px-4">
            Have a question or need assistance? Let us know by filling out the
            form below.
          </h3>
        </div>
        <div className="flex mt-20 flex-col sm:flex-row w-full gap-10 justify-center">
          {/* Left: Form */}
          <form className="flex w-full justify-center lg:w-2/5" action={send}>
            <div className="flex flex-col gap-4 w-full">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject"
                required
                className="bg-[#1e1e24] border-gray-600 text-white placeholder-gray-400 rounded-lg h-12 px-4 focus:border-[#4d84a4] focus:ring-[#4d84a4]"
              />
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                required
                rows={4}
                className="bg-[#1e1e24] border border-gray-600 text-white placeholder-gray-400 rounded-lg p-4 resize-none focus:border-[#4d84a4] focus:ring-1 focus:ring-[#4d84a4] focus:outline-none"
              ></textarea>
              <Button
                type="submit"
                className="w-full bg-[#4d84a4] hover:bg-[#3a6b85] text-white rounded-lg h-12 font-medium transition-colors"
              >
                Send Message
              </Button>
            </div>
          </form>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-8 text-white w-full lg:w-2/5">
            <div className="flex gap-4">
              <IoCall className="text-[32px] sm:text-[36px] flex-shrink-0" />
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold">Call us</h3>
                <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                  +91 9560967377
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <MdOutlineEmail className="text-[32px] sm:text-[36px] flex-shrink-0" />
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold">Email us</h3>
                <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                  officialparkitup@gmail.com
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <IoLocation className="text-[32px] sm:text-[36px] flex-shrink-0" />
              <div>
                <h3 className="text-2xl sm:text-3xl font-semibold">Visit us</h3>
                <p className="text-gray-300 cursor-pointer text-lg sm:text-xl">
                  811C, AB4, <br /> Delhi Technological University,
                  <br /> Rohini, Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
