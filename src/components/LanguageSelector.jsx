import { Menu, Transition } from "@headlessui/react";
import { Globe } from "react-feather";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let countries = [
  {
    code: "pl",
    name: "Polski",
    country_code: "pl",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        <Menu
          as="div"
          className="px-3 pl-0 relative flex"
          aria-label="usermenu"
        >
          <Menu.Button
            className="group w-full  text-sm text-left font-medium text-gray-700 focus:outline-none language-selector"
            aria-label="usermenu-button"
          >
            <span className="flex w-full justify-between items-center">
              <Globe />
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              aria-label="menu-item-container"
              className="z-10 mx-3 origin-top absolute left-[-36px] sm:left-[-25px] md:left-[-25px] top-[42px] xl:left-[-80px] right-0 min-w-max mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none languages-list-container"
            >
              <div className="px-1 py-1 languages-list" aria-label="menu-items">
                {countries.map((lng) => {
                  return (
                    <Menu.Item key={lng.code}>
                      <button
                        className={classNames(
                          "flex items-center space-x-2 px-4 py-2 text-sm cursor-pointer"
                        )}
                        onClick={() => i18n.changeLanguage(lng.code)} // used to change language that needs to be rendered
                        disabled={i18n.language === lng.code}
                      >
                        <span class={`fi fi-${lng.country_code}`}></span>
                        <span>{lng.name}</span>
                      </button>
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default LanguageSelector;
