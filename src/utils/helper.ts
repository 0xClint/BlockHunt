import { Applicant } from "src/interfaces/const";

export function truncateText(text: string, maxChars: number): string {
  if (!text) return "";
  if (text.length > maxChars) {
    return `${text.substring(0, maxChars)}...`;
  }
  return text;
}

export const removeDuplicateApplicants = (
  applicants: Applicant[]
): Applicant[] => {
  return applicants.filter(
    (applicant, index, self) =>
      index ===
      self.findIndex((t) => t.applicantAddress === applicant.applicantAddress)
  );
};

export function flattenAttributes(obj: any) {
  if (obj.attributes && Array.isArray(obj.attributes)) {
    obj.attributes.forEach((attribute: { trait_type: string; value: any }) => {
      obj[attribute.trait_type.toLowerCase()] = attribute.value;
    });
    delete obj.attributes;
  }
  return obj;
}

export function getMetadataUrlByIdentifier(
  data: any[] | null | undefined,
  identifier: string
): string | null {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const foundItem = data.find((item) => item.identifier === identifier);

  if (foundItem) {
    return foundItem.metadata_url;
  }

  return null;
}

export function updateTraitValue(obj: any, newValue: any[]): void {
  if (obj.attributes && Array.isArray(obj.attributes)) {
    const resultTrait = obj.attributes.find(
      (attribute: { trait_type: string; value: any }) =>
        attribute.trait_type === "Result"
    );

    if (resultTrait) {
      resultTrait.value = newValue; // Update the value for the 'Result' trait
    } else {
      console.error(`'Result' trait not found.`);
    }
  } else {
    console.error("Attributes are not in the correct format.");
  }
}

export function isStringInArray(
  array: string[],
  searchString: string
): boolean {
  return array.some(
    (element) => element.toLowerCase() === searchString.toLowerCase()
  );
}
