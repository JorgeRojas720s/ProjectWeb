import Events from "@/components/Events";
import Header from "@/components/Header";
import ContButtons from "@/components/ContButtons";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
    <Header />
    <section>
      <Events />
      <ContButtons/>
      <WhatsAppButton/>
    </section>
    </>
  );
}