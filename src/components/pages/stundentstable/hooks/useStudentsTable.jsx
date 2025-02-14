import { useState, useEffect, useCallback } from "react";
import { getAllStudents } from "../../../../utils/common";

const useStudentsTable = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getAllStudents();
      setStudentsData(students);
    };

    fetchStudents();
  }, []);

const refreshStudentsData = useCallback(async()=>{
    const students = await getAllStudents();
    console.log(students, 'refreshStudents')
      setStudentsData(students);
},[])

  return { studentsData, refreshStudentsData };
};

export default useStudentsTable;
