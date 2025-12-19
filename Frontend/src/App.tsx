import Button from "./components/Button"
import PlusIcon from "./icons/PlusIcon";
import ShareIcon from "./icons/ShareIcon";


const App = () => {
  return (
    <div>
      <h1 className="text-4xl text-black">TESTING</h1>
      <Button varient="primary" text="Add content"  startIcon={<PlusIcon/>} />
      <Button varient="secondary" text="Share Brain" startIcon={<ShareIcon/>} />
    </div>
  );
}

export default App