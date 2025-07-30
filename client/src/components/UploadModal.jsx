import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "motion/react";
import { Toaster, toast } from "sonner";
import Papa, { parse } from "papaparse";
import axios from "axios";

import CrossImage from "../images/CrossImage";
import SubmitImage from "../images/SubmitImage";
import TickImage from "../images/TickImage";
import CopyImage from "../images/CopyImage";

const UploadModal = ({
  open,
  setOpen,
  file,
  setFile,
  fileName,
  setFileName,
  confirm,
  setConfirm,
  setRefinedData,
  refinedData,
}) => {
  //   for dropped files
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);

    console.log(acceptedFiles);

    if (!acceptedFiles[0]) alert("You can only upload CSV or image!");
  }, []);

  const [parsedData, setParsedData] = useState();
  const [error, setError] = useState();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  //   for picked files
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);
    toast.info(`Your CSV data is ready for upload. Clicking Confirm will
                securely send the data to our servers for processing.`);
  };

  const handleSendData = async () => {
    setConfirm(true);
    setOpen(false);
    toast.success("Data being sent to backend!");
    try {
      const csvString = Papa.unparse(parsedData);
      console.log(csvString);
      const response = await axios.post("/api/ai/", { text: csvString });
      if (response.data.err) {
        setError(response.data.err);
        return;
      }

      setRefinedData(response.data.msg);
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error("Upload failed ", err.message);
    } finally {
      setConfirm(false);
      toast.success("Data has been generated successfully!");
    }
  };

  useEffect(() => {
    if (!file) return;

    Papa.parse(file, {
      header: false, // Treat first row as header
      skipEmptyLines: true, // Ignore empty lines
      complete: async (results) => {
        setParsedData(results.data); // Parsed CSV data as array of objects
        console.log(results.data);
      },
    });
  }, [file]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <AnimatePresence>
      <Toaster richColors />
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
          transition={{ duration: 0.2 }}
          className="md:w-[900px] md:max-h-[600px] max-md:w-[350px] max-md:top-10 max-md:h-[500px] overflow-x-hidden scrollbar-hide bg-[#ebf1f6] m-10 z-50 absolute top-0 rounded-3xl"
        >
          {/* Content */}
          <div className="flex flex-col">
            {/* CSV Upload Header */}
            <div className="flex sticky z-10 bg-[#e7eefa] top-0 justify-between p-5 border-b-1 border-[#d3d6dc]">
              <div>
                <div className="flex items-center gap-2 max-md:justify-center">
                  <SubmitImage color="#4076ed" size={40} />
                  <p className="text-2xl font-semibold">CSV Upload</p>
                </div>
                <p className=" mt-2 max-md:text-center text-[#9fa3ad]">
                  Import your bank statements and transaction data
                </p>
              </div>
              <span
                className="cursor-pointer max-md:mt-1"
                onClick={() => setOpen(false)}
              >
                <CrossImage size={30} />
              </span>
            </div>
            {/* Upload Area  */}
            <div {...getRootProps()}>
              <input
                {...getInputProps()}
                type="file"
                className="hidden"
                id="file"
                accept=".csv,.png,.jpg,.jpeg, .xlsx"
                onChange={handleFileChange}
              />
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`mt-5 active:ring-blue-500 bg-white overflow-y-auto overflow-x-hidden m-5 rounded-3xl flex flex-col justify-center items-center border-2 border-dashed p-10 cursor-pointer transition-colors
                            ${
                              isDragActive || file
                                ? "border-blue-500 bg-blue-50"
                                : "border-[#d3d6dc] hover:border-[#b7b9bd]"
                            }`}
              >
                <span className="bg-[#ecf4ff] rounded-3xl p-4 max-md:p-2">
                  {file ? (
                    <TickImage className="w-10 h-10" color="#4076ed" />
                  ) : (
                    <SubmitImage color="#4076ed" size={40} />
                  )}
                </span>
                <p className="font-semibold text-xl mt-5">
                  {isDragActive
                    ? "Drop the file here..."
                    : !file && "Upload a CSV or Image"}
                  {!isDragActive && fileName && file && fileName.split(".")[0]}
                </p>
                <p className="text-[#9fa3ad] mt-5 max-md:text-center max-md:w-[300px]">
                  {!file
                    ? "Drag and drop your bank statement or click to browse"
                    : "Go Pro to upload multiple files!"}
                </p>
              </motion.div>
            </div>

            {/* Expected format */}
            <div className="mt-5 m-3 rounded-3xl bg-[#F0F4F8] p-5">
              <p className="text-2xl font-semibold max-md:text-center">
                {parsedData ? "Parsed CSV Data" : "Expected CSV Format"}
              </p>
              <div className="m-3 relative bg-white pt-3 px-3 rounded-3xl border-1 border-[#f3f5f9]">
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify(parsedData))
                  }
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <CopyImage className="w-6 h-6" />
                </span>
                {file ? (
                  <pre className="overflow-y-scroll scrollbar-hide max-h-[200px]">
                    {JSON.stringify(parsedData, null, 2)}
                  </pre>
                ) : (
                  <div>
                    <p className="text-[#59626f] font-semibold">
                      Date, Description, Amount
                    </p>
                    <p className="font-mono">2025-07-19,Grocery Store,-120</p>
                    <p className="font-mono">2025-07-20,Salary Credit,30000</p>
                    <p className="font-mono">2025-07-21,Netflix,-1000</p>
                  </div>
                )}
              </div>
            </div>

            {parsedData && !confirm && (
              <div className="max-md:w-full cursor-pointer max-md:flex max-md:justify-center">
                <motion.div
                  onClick={handleSendData}
                  className="max-md:w-[300px]  transition cursor-pointer mt-5 flex justify-center rounded-2xl bg-[#9fbbf6] hover:bg-[#abc2f4]  p-3 m-2"
                >
                  <button className="cursor-pointer">Confirm</button>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;
