import { FC } from "react";

const Scroll: FC<{classNameProp : string}> = ({ children , classNameProp}) => {
  return (
    <div className={"scroll position-relative overflow-hidden " + classNameProp}>
      <div className="w-full h-full flex flex-col absolute top-0 left-0 scroll-y">
        {children}
      </div>
    </div>
  );
}

export default Scroll;
