import NavigationButtons from './_components/navigation-buttons';
import ResultsSection from './_components/results-section';
import Search from './_components/search';

function Page() {
  return (
    <div className="space-y-8">
      <header className="grid grid-cols-[auto_1fr] items-center gap-2 p-4">
        <NavigationButtons />
        <Search />
      </header>

      <ResultsSection />
    </div>
  );
}

export default Page;
