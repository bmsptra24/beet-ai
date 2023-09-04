import React from "react";

const page = () => {
  // ! send email (dont use useEffect)
  // ! verivication the code and go to home
  // ! also go this page if user login and not verificated
  const email = "email@email.com";
  return (
    <main className="min-h-screen relative text-xl flex items-center justify-center bg-primary-four ">
      <div className="flex flex-col">
        <p>{email}</p>
        <input type="number" />
        <button>Next</button>
      </div>
    </main>
  );
};

export default page;
