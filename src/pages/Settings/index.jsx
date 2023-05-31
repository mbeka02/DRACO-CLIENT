import UpdatePasswordForm from "./UpdatePasswordForm";

const Settings = () => {
  return (
    <div className=" my-10 grid h-fit w-full  gap-3 rounded-sm px-6 md:mx-20 md:px-4">
      <h3 className=" text-xl font-semibold">Change password</h3>
      <UpdatePasswordForm />
    </div>
  );
};

export default Settings;
