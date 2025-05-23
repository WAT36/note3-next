import BarLinkGroup from "../barLinkGroup/BarLinkGroup";
import Container from "../container/Container";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-white border-t border-neutral-200 dark:bg-slate-900">
      <Container>
        <div className="py-4 flex flex-row flex-wrap justify-center block lg:hidden items-center">
          <BarLinkGroup />
        </div>
        <div className="py-4 flex flex-col lg:flex-row items-center">
          <h3 className="text-xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            © 2023, WAT
          </h3>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
