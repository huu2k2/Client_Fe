import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  HiOutlineMenuAlt3 as Bars3Icon,
  HiOutlineBell as BellIcon,
  HiOutlineX as XMarkIcon,
} from "react-icons/hi";
import Logo from "../../../assets/logo1.png";
const navigation = [
  { name: "Danh sách phòng trống", href: "", current: true },
  { name: "Chính sách", href: "/policy", current: false },
  // { name: "Đặt lịch dẫn khách", href: "/book", current: false },
  // { name: "Đặt cọc giữ chỗ", href: "/deposit", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function index({ page }) {
  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="mx-auto w-4/5 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between border-b-2 border-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-rose-400 hover:bg-rose-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-6 w-auto" src={Logo} alt="Your Company" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <button
                        onClick={() => {
                          //   handleLink(item.href, params.id);
                        }}
                        key={item.name}
                        className={
                          "bg-rose-700 text-white hover:bg-rose-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }
                        // aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-rose-900 text-white"
                      : "text-rose-300 hover:bg-rose-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
