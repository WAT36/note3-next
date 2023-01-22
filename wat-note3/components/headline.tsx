type Props = {
  children?: React.ReactNode;
};

export default function H2({ children }: Props) {
  return (
    <p className="text-5xl font-bold border-b-2 border-solid border-black my-4">
      {children}
    </p>
  );
}
