import Popover from "@/components/Popover";
import React, { useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import ImageLoader from "@/components/Loader/Loader";
import Button from "@/components/Button";
import { formatDataVersion } from "@/lib/helpers/format";
import { FetchDataVersion } from "@/lib/hooks/fetchData";
import { updateVersion } from "@/lib/hooks/updateData";
const VersionUpdates = () => {
  let versionDocName = process.env.NEXT_PUBLIC_FIREBASE_VERSION_NAME ?? "";
  let versionDocId =  process.env.NEXT_PUBLIC_FIREBASE_VERSION_ID ?? "";
  const {
    mobileVersion,
    setMobileVersion,
    offlineVersions,
    setOfflineVersion,
  } = FetchDataVersion(versionDocName, versionDocId);

  const [data, setData] = useState({
    loading: false,
    isError: false,
    open: false,
    responseMessage: "",
  });

  function onClick() {
    setData((prevData) => ({
      ...prevData,
      open: false,
      responseMessage: "",
      loading: false,
    }));
    return;
  }

  const checkAvailability = async (
    versionNumber: number,
    versionName: string
  ) => {
    setData((prevData) => ({
      ...prevData,
      loading: true,
      responseMessage: "",
    }));

    console.log(offlineVersions, versionNumber);

    const checkVersionNumberExists = offlineVersions.some(
      (version) => version === Number(versionNumber)
    );

    console.log("this exists", checkVersionNumberExists);

    if (checkVersionNumberExists) {
      let message = `Sorry the version number ${versionNumber} already exists for ${versionName} mobile app`;

      setData((prevData) => ({
        ...prevData,
        loading: false,
        responseMessage: message,
        open: true,
        isError: true,
      }));

      return;
    }

    setMobileVersion((previousVersion) =>
      previousVersion.map((version, i) =>
        versionName === version.versionName
          ? { ...version, versionNumber: versionNumber }
          : version
      )
    );
    let updatedVersionsObject: Record<string, any> = {};
    for (let data of mobileVersion) {
      console.log("my data", Object.values(data));
      const [key, values] = Object.values(data);
      updatedVersionsObject[key] = Number(values);
    }
    console.log("finally formatted", updatedVersionsObject);

    versionDocName = "versionsTests";
    versionDocId = "gA0R6EoO8Ym89rP4iyhm";

    updateVersion(
      versionDocName,
      versionDocId,
      updatedVersionsObject,
      setData,
      versionNumber,
      versionName,
      setOfflineVersion
    );
  };

  const handleBuildChange = (index: number, field: string, value: string) => {
    console.log("my value", value);
    setMobileVersion((previousVersion) =>
      previousVersion.map((version, i) =>
        index === i ? { ...version, [field]: value } : version
      )
    );
  };

  const handleBuildBlur = (index: number, field: string) => {
    console.log("my offline", offlineVersions);
    setMobileVersion((prevVersions) =>
      prevVersions.map((version, i) =>
        index === i && !version.versionNumber
          ? { ...version, [field]: offlineVersions[index] } // Set default if empty
          : version
      )
    );
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full">
        <div className="flex justify-between me-36">
          <h2 className="text-xl font-semibold text-gray-900 text-center mx-5">
            Version Updates Command
          </h2>
          <div>
            <Popover title="Version Updates Command">
              <h3 className="font-semibold text-lg mb-2">
                /version Updates Command
              </h3>
              <p>
                <strong>Purpose:</strong> Manage version updates for mobile apps
              </p>
              <p>
                <strong>Parameters:</strong>
                <ul>
                  <li>
                    <strong>Build Number:</strong> The mobile application build
                    version number.
                  </li>
                </ul>
              </p>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-around flex-wrap p-4 gap-y-6 w-full">
          {mobileVersion.length === 0 && <ImageLoader />}

          {mobileVersion.map((app, index) => {
            const { title, description }: any =
              formatDataVersion(app?.versionName) || {};
            console.log(title, app);
            return (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-md bg-blue-50 w-full md:w-[24%]"
              >
                <h4 className=" font-semibold text-blue-700 text-md">
                  {" "}
                  {title}
                </h4>
                <p className="text-sm text-gray-600">{description}</p>

                <div className="mt-4">
                  <label className="block text-md font-medium text-gray-900 mb-1 font-semibold">
                    App Version No.
                  </label>
                  <input
                    type="text"
                    value={app.versionNumber}
                    onChange={(e) =>
                      handleBuildChange(index, "versionNumber", e.target.value)
                    }
                    onBlur={() => handleBuildBlur(index, "versionNumber")}
                    className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                    placeholder="Enter Build Number"
                  />
                </div>

                <div className="-mt-2 w-[100%]">
                  <Button
                    handleSubmit={() =>
                      checkAvailability(app.versionNumber, app.versionName)
                    }
                    loading={data.loading}
                    buttonName="Update Version"
                  ></Button>
                </div>
              </div>
            );
          })}
        </div>

        {data.responseMessage && (
          <Modal
            onClick={onClick}
            setOpen={(open) => setData((prevData) => ({ ...prevData, open }))}
            open={data.open}
            modalHead="Version Updates"
          >
            {data.isError && (
              <div className="my-4 p-4 border rounded-md text-md text-center bg-white text-red-500 border-slate-300">
                <span className="font-semibold">{data.responseMessage}</span>
              </div>
            )}
            {!data.isError && (
              <div className="my-4 p-4 border rounded-md text-md text-center bg-white text-blue-500 border-slate-300">
                <span className="font-semibold">{data.responseMessage}</span>
              </div>
            )}
          </Modal>
        )}

        {data.loading && <ImageLoader />}
      </div>
    </div>
  );
};

export default VersionUpdates;
