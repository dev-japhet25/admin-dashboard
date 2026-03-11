function isObject(txt: any) {
  return txt !== null && typeof txt === "object" && !Array.isArray(txt);
}

export { isObject };

const maintenanceApps = {
  bs: {
    title: "Bible Society Android",
    description: "Bible Society Android",
  },
  lsi: {
    title: "LSI Android",
    description: "LSI Android",
  },
  icgc: {
    title: "ICGC Andrioid",
    description: "ICGC Android",
  },
  gw: {
    title: "Greater Works Android",
    description: "Greater Works Android",
  },
  vanilla: {
    title: "Asoriba android",
    description: "Asoriba android",
  },
  lsiIos: {
    title: "LSI Ios",
    description: "LSI Ios",
  },
  bsIos: {
    title: "Bible Society Ios",
    description: "Bible Society Ios",
  },
  icgcIos: {
    title: "ICGC Ios",
    description: "ICGC Ios",
  },
  gwIos: {
    title: "Greater Works Ios",
    description: "Greater Works Ios",
  },
  vanillaIos: {
    title: "Asoriba Ios",
    description: "Asoriba Ios",
  },
};

const versionApps = {
  gwVersion: {
    title: "Greater Works Android",
    description: "Greater Works Android",
  },
  bsVersion: {
    title: "Bible Society Android",
    description: "Bible Society Android",
  },
  icgcVersion: {
    title: "ICGC Android",
    description: "ICGC Android",
  },
  lsiVersion: {
    title: "LSI Android",
    description: "LSI Android",
  },
  vanillaVersion: {
    title: "Asoriba android",
    description: "Asoriba android",
  },
  iosGwVersion: {
    title: "Greater Works Ios",
    description: "Greater Works Ios",
  },
  iosLsiVersion: {
    title: "LSI Ios",
    description: "LSI Ios",
  },
  iosVanillaVersion: {
    title: "Asoriba Ios",
    description: "Asoriba Ios",
  },
  iosIcgcVersion: {
    title: "ICGC Ios",
    description: "ICGC Ios",
  },
};

export function formatDataMaintenance(
  data: string
): { title: string; description: string } | null {
  if (data in maintenanceApps) {
    return maintenanceApps[data as keyof typeof maintenanceApps]; // Type assertion
  }

  // Return null or a default object if key does not exist
  return null;
}

export function formatDataVersion(
  data: string
): { title: string; description: string } | null {
  if (data in versionApps) {
    return versionApps[data as keyof typeof versionApps]; // Type assertion
  }
  // Return null or a default object if key does not exist
  return null;
}
