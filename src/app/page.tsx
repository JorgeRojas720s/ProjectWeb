import Events from "@/components/Events";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactButtons from "@/components/ContactButtons";

export default function Home() {
  return (
    <>
    <section>
      <Events />
      <ContactButtons />
      <WhatsAppButton/>
    </section>
    </>
  );
}