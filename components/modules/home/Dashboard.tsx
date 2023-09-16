import { AiOutlinePlus } from "react-icons/ai";

const Dashboard = () => {
  return (
    <>
      <div className="flex gap-5">
        <div className="bg-primary-five px-5 py-4 rounded border-2 border-primary-black grow">
          <p className="font-bold">300 dialog</p>
        </div>
        <div className="bg-primary-five px-5 py-4 rounded border-2 border-primary-black grow">
          <p className="font-bold">5 project</p>
        </div>
      </div>
      <div className="bg-primary-five px-5 py-3 flex flex-col gap-1 rounded border-2 border-primary-black">
        <p className="font-bold">Free trial usage</p>
        <div className="flex justify-between gap-5 items-center">
          <div className="rounded-full h-4 bg-primary-white grow border-2 border-primary-black"></div>
          <p>Rp8.900/Rp10.000</p>
        </div>
        <p>
          In order to use the OpenAI API, you need to set up a paid account.
        </p>
      </div>
      <div className="border-2 flex gap-2 items-center border-primary-black hover:bg-primary-black/10 cursor-pointer transition-all ease-in-out rounded-full p-3">
        <AiOutlinePlus />
        <p>New project</p>
      </div>
      <div className="grow h-0 overflow-hidden hover:overflow-y-scroll">
        <table className="w-full">
          <tbody className="flex flex-col gap-2">
            <tr className="border-b-2 border-primary-black grid grid-cols-3">
              <th className="font-normal text-left ml-2">Project</th>
              <th className="font-normal text-left ml-2">Platform</th>
              <th className="font-normal text-left ml-2">Last Open</th>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
            <tr className="grid bg-primary-five hover:bg-primary-two/70 transition-all ease-in-out cursor-pointer grid-cols-3 border-2 border-primary-black rounded">
              <td className="p-2 rounded">Chef Minato AI</td>
              <td className="p-2">Youtube</td>
              <td className="p-2 rounded">08 September 2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
