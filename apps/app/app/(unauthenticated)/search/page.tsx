import NavigationButtons from './_components/navigation-buttons';
import Search from './_components/search';

function Page() {
  return (
    <div className="p-4">
      <header className="grid grid-cols-[auto_1fr] items-center gap-2">
        <NavigationButtons />
        <Search />
      </header>
    </div>
  );
}

export default Page;
