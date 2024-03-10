import Container from "../container/Container";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-900">
      <Container>
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
