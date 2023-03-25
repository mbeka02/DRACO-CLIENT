import axios from "axios";
axios.defaults.withCredentials = true;

import { useMutation, useQueryClient } from "react-query";

const AvatarSelector = () => {
  const queryClient = useQueryClient();

  const updateAvatar = useMutation(
    async (formData) => {
      try {
        await axios.post(
          "http://localhost:3000/api/v1/user/updateProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    { onSuccess: () => queryClient.invalidateQueries() }
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const upload = e.currentTarget.files[0];
    formData.append("upload", upload);
    updateAvatar.mutate(formData);
  };

  return (
    <form
      encType="multipart/form-data"
      className="  profile-selector absolute bottom-0 right-0 flex h-12 w-12  flex-col rounded-full bg-white"
    >
      <input
        className=" h-full w-full opacity-0 "
        type="file"
        name="upload"
        onChange={handleSubmit}
      />
    </form>
  );
};
export default AvatarSelector;
