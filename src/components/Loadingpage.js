// import { XlviLoader } from "react-awesome-loaders";
// const XlviLoaderComponent = () => {
//   return (
//     <>
//       <XlviLoader
//         boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
//         desktopSize={"128px"}
//         mobileSize={"100px"}
//       />
//     </>
//   );
// };

// export default XlviLoaderComponent

import { CircleLoader } from "react-awesome-loaders";
export const CircleLoaderComponent = () => {
  return (
    <>
      <CircleLoader
        meshColor={"#978460"}
        lightColor={"#E0E7FF"}
        duration={1.5}
        desktopSize={"90px"}
        mobileSize={"64px"}
        
      />
    </>
  );
};

export default CircleLoaderComponent