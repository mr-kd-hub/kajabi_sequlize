import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Courselist from "./Courselist";
import Subcourselist from "./Subcourse/Subcourselist";
import Contentlist from "./Content/Contentlist";
function List() {
  //   const [subCourse, setSubcourse] = useState({ show: false, id: 0 });
  const flow = useSelector((state) => state.flowReducer);
  //   console.log(flow);
  return (
    <div>
      {!flow.subcourse && !flow.show && <Courselist />}
      {flow.subcourse && !flow.show && <Subcourselist id={flow.id} />}
      {!flow.subcourse && flow.show && <Contentlist id={flow.id} />}
    </div>
  );
}

export default List;
