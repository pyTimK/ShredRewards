import { Dispatch, SetStateAction, useContext, useState } from "react";
import styles from "../styles/Accounts.module.css";
import { ArrowBack } from "akar-icons";
import PageTransition from "../Components/PageTransition";
import { AppContext } from "../pages/_app";
import { DeviceType } from "../hooks/useDeviceType";
import SizedBox from "../Components/SizedBox";

const transitionDurationSec = 0.3;

interface AccountPushPageProps {
  setIsAccountPageOpen: Dispatch<SetStateAction<boolean>>;
}

const AccountPushPage: React.FC<AccountPushPageProps> = ({
  setIsAccountPageOpen,
}) => {
  const [isReverse, setIsReverse] = useState(false);
  const { device } = useContext(AppContext);
  const avatarSize = device === DeviceType.Smartphone ? 80 : 150;

  const handleArrowBackClick = () => {
    setIsReverse(true);
    setTimeout(() => {
      setIsAccountPageOpen(false);
      setIsReverse(false);
    }, transitionDurationSec * 1000); // make sure to match the duration of the PageTransition animation
  };

  return (
    <PageTransition isReverse={isReverse} duration={transitionDurationSec}>
      <div className={styles.wrapper}>
        <ArrowBack size={36} onClick={handleArrowBackClick} />
      </div>
    </PageTransition>
  );
};
export default AccountPushPage;

// <div>
//   <h1>Account</h1>
//   <SizedBox height={30} />
//   {/* <BackgroundBlob /> */}
//   {authUser && user && (
//     <div className={styles.overview}>
//       <div className={styles.imgOverview}>
//         <MyAvatar
//           photoURL={user?.photoURL}
//           size={avatarSize}
//           letter={authUser.displayName ?? user.name}
//           nonclickable
//           onFrontAbsolute
//         />
//         <Sizedbox height={avatarSize} width={avatarSize} />
//         <BackgroundBlob avatarSize={avatarSize} />
//       </div>
//       <div className={styles.textDetailsOverview}>
//         <h2>{authUser.displayName ?? user.name}</h2>
//         <p>{authUser.email}</p>
//       </div>
//     </div>
//   )}

//   <form onSubmit={updateUser}>
//     <PersonalDetailsSettingsBlock />
//     <div
//       className={clsx(
//         styles.onChangeButtonWrapper,
//         !editing && "hidden"
//       )}
//     >
//       <button
//         type="reset"
//         className={"transparent-button"}
//         onClick={discardChanges}
//         disabled={saveButtonStatus === ButtonStatus.Disabled}
//       >
//         Discard
//       </button>
//       <button
//         type="submit"
//         className={"pink-button"}
//         disabled={saveButtonStatus === ButtonStatus.Disabled}
//       >
//         Save
//       </button>
//     </div>
//   </form>
//   {/* <Sizedbox height={50} /> */}
//   <div className={clsx(styles.signOutButton, editing && "hidden")}>
//     <button className="black-button" onClick={logout}>
//       Sign out
//     </button>
//   </div>
//   <Sizedbox height={50} />
// </div>;
