import React from "react"

export default function BaseUserFeed() {
  return (
    <>
      {/*<!-- Component: User feed --> */}
      <ul
        aria-label="User feed"
        role="feed"
        className="relative flex flex-col gap-12 py-12 pl-8 before:absolute before:top-0 before:left-8 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:top-6 after:left-8 after:bottom-6 after:-translate-x-1/2 after:border after:border-slate-200 "
      >
        <li role="article" className="relative pl-8 ">
          <div className="flex flex-col flex-1 gap-4">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white"
            >
              <img
                src="https://i.pravatar.cc/48?img=1"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
              <span className="flex-1">
                Mary Jane
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  created a new thread
                </span>
              </span>
              <span className="text-sm font-normal text-slate-400">
                {" "}
                3 hours ago
              </span>
            </h4>
            <p className=" text-slate-500">
              We just released windUI v1.5, which includes a brand new
              component. An activity feed is a chronological record of system
              events or user actions. Have a look at the feed page and let me
              know what you think. Feedback is highly appreciated.{" "}
            </p>
          </div>
        </li>
        <li role="article" className="relative pl-8 ">
          <div className="flex flex-col flex-1 gap-4">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white"
            >
              <img
                src="https://i.pravatar.cc/48?img=12"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
              <span className="flex-1">
                John langan{" "}
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  replied{" "}
                </span>
              </span>
              <span className="text-sm font-normal text-slate-400">
                {" "}
                2 hours ago
              </span>
            </h4>
            <p className=" text-slate-500">
              It looks awesome! Good one! The only thing that I would tweak is
              the spacing in smaller screens. Other than that it looks superb!
              Really loved the color as well.{" "}
            </p>
          </div>
        </li>
        <li role="article" className="relative pl-8 ">
          <div className="flex flex-col flex-1 gap-4">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white"
            >
              <img
                src="https://i.pravatar.cc/48?img=1"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
              <span className="flex-1">
                Mary Jane{" "}
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  replied{" "}
                </span>
              </span>
              <span className="text-sm font-sm text-slate-400">
                {" "}
                3 hours ago
              </span>
            </h4>
            <p className=" text-slate-500">
              Thanks so much 🙏. Your feedback is highly appreciated.
            </p>
          </div>
        </li>
        <li role="article" className="relative pl-8 ">
          <div className="flex flex-col flex-1 gap-4">
            <a
              href="#"
              className="absolute z-10 inline-flex items-center justify-center w-8 h-8 text-white rounded-full -left-4 ring-2 ring-white"
            >
              <img
                src="https://i.pravatar.cc/48?img=13"
                alt="user name"
                title="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </a>
            <h4 className="flex flex-col items-start text-lg font-medium leading-8 text-slate-700 md:flex-row lg:items-center">
              <span className="flex-1">
                Manos Gaitanakis
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  commented
                </span>
              </span>
              <span className="text-sm font-normal text-slate-400">
                {" "}
                3 hours ago
              </span>
            </h4>
            <p className=" text-slate-500">
              Love it! I really like how the nested feeds are working as well.
              Is that going to be multi-nested? Or maybe stay in just one level.
              Also any ides on how I can remove the time stamp from the feeds?
            </p>
          </div>
        </li>
      </ul>
      {/*<!-- End User feed --> */}
    </>
  )
}