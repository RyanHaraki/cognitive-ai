import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalOptions {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  primaryFunction: () => void;
  type: string; // "SAVE_WORKFLOW" | "DELETE_WORKFLOW" | "INTEGRATE_WORKFLOW"
}

export default function Modal({
  isOpen,
  setIsOpen,
  primaryFunction,
  type,
}: ModalOptions) {
  const closeModal = () => {
    setIsOpen(false);
  };

  const renderUI = () => {
    if (type == "DELETE_WORKFLOW") {
      return (
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-bold font-almarai leading-6 text-gray-900 "
          >
            Delete Workflow
          </Dialog.Title>

          {/* BODY */}
          <div className="mt-2 flex flex-col space-y-4"></div>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this Workflow? This action is
            irreversible.
          </p>
          <div className="mt-4 space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-white hover:bg-red-700 transition ease-in-out"
              onClick={() => {
                closeModal();
                primaryFunction();
              }}
            >
              Delete Workflow
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-blue-100 text-blue-500 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200 transition ease-in-out"
              onClick={() => {
                closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      );
    } else if (type == "SAVE_WORKFLOW") {
      return (
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-bold font-almarai leading-6 text-gray-900 "
          >
            Workflow Saved!
          </Dialog.Title>

          {/* BODY */}
          <div className="mt-2 flex flex-col space-y-4"></div>

          <div className="mt-4 space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-blue-100 text-blue-500 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200 transition ease-in-out"
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      );
    } else if (type == "COPY_WORKFLOW_ID") {
      return (
        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title
            as="h3"
            className="text-lg font-bold font-almarai leading-6 text-gray-900 "
          >
            Workflow ID Copied!
          </Dialog.Title>

          {/* BODY */}
          <div className="mt-2 flex flex-col space-y-4"></div>

          <div className="mt-4 space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md bg-blue-100 text-blue-500 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200 transition ease-in-out"
              onClick={() => {
                closeModal();
              }}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      );
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* render the UI in here */}
                {renderUI()}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
