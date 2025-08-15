
export default function Footer({ name }: { name: string }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card mt-16 py-6">
      <div className="container mx-auto max-w-4xl text-center text-muted-foreground">
        <p>&copy; {currentYear} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
