import React from "react";
import { Formik, Form, Field } from "formik";
import { Table, Input, Button, Row, Col, Label } from "reactstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CheckboxGroup = ({ name, options }) => (
  <div className="d-flex flex-wrap">
    {options.map((opt) => (
      <Label key={opt} className="me-3">
        <Field type="checkbox" name={name} value={opt} /> {opt}
      </Label>
    ))}
  </div>
);

const downloadPdf = async () => {
  const input = document.getElementById("pdf-area");

  // Clone the input element to avoid affecting the original DOM
  const clonedInput = input.cloneNode(true);

  // Create a virtual container with a fixed width
  const virtualContainer = document.createElement("div");
  virtualContainer.style.width = "1440px"; // Match your laptop screen width
  virtualContainer.style.padding = "20px"; // Add padding to match the original
  virtualContainer.style.position = "absolute";
  virtualContainer.style.top = "-9999px"; // Hide it off-screen
  virtualContainer.style.backgroundColor = "white"; // Ensure a white background
  virtualContainer.style.fontSize = "14px"; // Ensure consistent font size
  virtualContainer.appendChild(clonedInput);

  // Append the virtual container to the body
  document.body.appendChild(virtualContainer);

  // Temporarily override responsive styles
  const style = document.createElement("style");
  style.innerHTML = `
      @media (max-width: 768px) {
        #pdf-area {
          padding: 20px !important;
        }
        .d-flex {
          flex-direction: row !important; /* Force row layout */
        }
        table {
          font-size: 14px !important; /* Match desktop font size */
        }
        table tbody tr td {
          display: table-cell !important; /* Force table-cell layout */
          width: auto !important;
          text-align: left !important;
        }
      }
    `;
  virtualContainer.appendChild(style);

  // Render the virtual container to a canvas
  const canvas = await html2canvas(virtualContainer, {
    scale: 3, // Increase scale for better resolution
    useCORS: true, // Handle cross-origin images
  });
  const imgData = canvas.toDataURL("image/png");

  // Remove the virtual container after rendering
  document.body.removeChild(virtualContainer);

  // Generate the PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const imgWidth = pageWidth;
  const imgHeight = (canvasHeight * pageWidth) / canvasWidth;

  let heightLeft = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Add additional pages if content overflows
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("Technical_Visit_Report.pdf");
};

const TechnicalVisitReport = () => {
  return (
    <Formik
      initialValues={{
        mouryaRefNo: "",
        date: "",
        customerName: "",
        propertyShownBy: "",
        relationship: "",
        postalAddress: "",
        latitudeLongitude: "",
        typeOfProperty: [],
        propertyUsedAs: [],
        boundariesType: [],
        east: "",
        west: "",
        north: "",
        south: "",
        eastBuilding: "",
        westBuilding: "",
        northBuilding: "",
        southBuilding: "",
        floors: "",
        wings: "",
        lifts: "",
        flatsPerFloor: "",
        demarcation: "",
        hall: "",
        kitchen: "",
        bedroom: "",
        wcBath: "",
        occupancy: [],
        sinceHowLong: "",
        occupantRelation: "",
        rent: "",
        societyBoard: "",
        nameOnDoor: "",
        ageOfProperty: "",
        electricMeter: "",
        qualityConstruction: [],
        exteriorCondition: [],
        interiorCondition: [],
        municipalLimits: [],
        surroundingArea: [],
        amenities: [],
        constructionType: [],
        entranceDirection: "",
        roofType: [],
        flooring: [],

        paint: [],
        doors: [],
        windows: [],
        kitchenPantry: [],
        bathroomsDado: [],
        bathroomsTiles: "",
        toiletDado: [],
        toiletTiles: "",
        electricalFittings: [],
        plumbingFittings: [],

        landmark: "",
        distanceCityCentre: "",
        nearestBank: "",
        nearestRailway: "",
        nearestBusStop: "",
        nearestMajorRoad: "",
        nearestSchool: "",
        nearestHospital: "",
        localityCondition: [],
        approachRoadType: [],
        approachRoadWidth: "",

        negativeFactors: [],

        rateAsPerEnquiryType: [],
        rateAsPerEnquiryValue: "",
        rateAsPerSelfType: [],
        rateAsPerSelfValue: "",

        carpetArea: "",
        builtupArea: "",
        plotArea: "",

        stageOfBuilding: [],
        constructionActive: [],
        constructionStoppedSince: "",
        labourAvailable: [],
        noOfLabours: "",

        constructionStages: {
          foundation: { total: "", completed: "" },
          plinth: { total: "", completed: "" },
          rcc: { total: "", completed: "" },
          brick: { total: "", completed: "" },
          externalPlaster: { total: "", completed: "" },
          internalPlaster: { total: "", completed: "" },
          flooring: { total: "", completed: "" },
          electrification: { total: "", completed: "" },
          plumbing: { total: "", completed: "" },
          woodwork: { total: "", completed: "" },
          painting: { total: "", completed: "" },
        },
      }}
      onSubmit={downloadPdf}
    >
      {() => (
        <Form>
          <div id="pdf-area" className="pdf-area">
            <div className="table-responsive-wrapper">
              <Table bordered size="sm" className="technical-table">
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center bg-light">
                      <b>
                        MOURYA CONCEPTS OPC PVT LTD – TECHNICAL VISIT REPORT
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Mourya Ref No</td>
                    <td colSpan="2">
                      <Field
                        as={Input}
                        name="mouryaRefNo"
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>Date</td>
                    <td colSpan="2">
                      <Field as={Input} name="date" style={{ width: "100%" }} />
                    </td>
                  </tr>
                  <tr>
                    <td>Customer Name</td>
                    <td colSpan="5">
                      <Field
                        as={Input}
                        name="customerName"
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Property Shown By</td>
                    <td colSpan="3">
                      <Field
                        as={Input}
                        name="propertyShownBy"
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>Relationship with Applicant</td>
                    <td>
                      <Field
                        as={Input}
                        name="relationship"
                        style={{ width: "100%" }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Postal Address</td>
                    <td colSpan="5">
                      <Field as={Input} type="textarea" name="postalAddress" />
                    </td>
                  </tr>

                  <tr>
                    <td>Latitude / Longitude</td>
                    <td colSpan="5">
                      <Field as={Input} name="latitudeLongitude" />
                    </td>
                  </tr>

                  <tr>
                    <td>Type of Property</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="typeOfProperty"
                        options={[
                          "Flat",
                          "Row House",
                          "Bungalow",
                          "Shop",
                          "Office",
                          "Plot",
                          "Commercial",
                          "Industrial",
                          "Agricultural",
                          "Individual House",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Property Used As</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="propertyUsedAs"
                        options={[
                          "Residential",
                          "Commercial",
                          "Industrial",
                          "Mixed",
                        ]}
                      />
                    </td>
                  </tr>

                  {/* ---------- BOUNDARIES SECTION ---------- */}
                  <tr>
                    <td colSpan="6" className="text-center bg-light">
                      <b>BOUNDARIES</b>
                    </td>
                  </tr>

                  {/* Header Row */}
                  <tr className="text-center">
                    <td>
                      <b>Boundaries</b>
                    </td>
                    <td colSpan="2">
                      <CheckboxGroup
                        name="boundariesType"
                        options={["Plot", "Land", "Flat", "Shop", "Office"]}
                      />
                    </td>
                    <td colSpan="3">
                      <b>Building</b>
                    </td>
                  </tr>

                  {/* East */}
                  <tr>
                    <td>East</td>
                    <td colSpan="2">
                      <Field as={Input} name="east" />
                    </td>
                    <td colSpan="3">
                      <Field as={Input} name="eastBuilding" />
                    </td>
                  </tr>

                  {/* West */}
                  <tr>
                    <td>West</td>
                    <td colSpan="2">
                      <Field as={Input} name="west" />
                    </td>
                    <td colSpan="3">
                      <Field as={Input} name="westBuilding" />
                    </td>
                  </tr>

                  {/* North */}
                  <tr>
                    <td>North</td>
                    <td colSpan="2">
                      <Field as={Input} name="north" />
                    </td>
                    <td colSpan="3">
                      <Field as={Input} name="northBuilding" />
                    </td>
                  </tr>

                  {/* South */}
                  <tr>
                    <td>South</td>
                    <td colSpan="2">
                      <Field as={Input} name="south" />
                    </td>
                    <td colSpan="3">
                      <Field as={Input} name="southBuilding" />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center bg-light"
                      style={{ height: "40px" }}
                    ></td>
                  </tr>

                  <tr>
                    <td>No. of Floors</td>
                    <td>
                      <Field as={Input} name="floors" />
                    </td>
                    <td>Wings</td>
                    <td>
                      <Field as={Input} name="wings" />
                    </td>
                    <td>No. of Lifts</td>
                    <td>
                      <Field as={Input} name="lifts" />
                    </td>
                  </tr>

                  <tr>
                    <td>No. of Flats / Units on Floor</td>
                    <td>
                      <Field as={Input} name="flatsPerFloor" />
                    </td>
                    <td colSpan="2">Demarcation</td>
                    <td colSpan="2">
                      <Field as={Input} name="demarcation" />
                    </td>
                  </tr>

                  <tr>
                    <td>No. of Rooms</td>
                    <td>
                      Hall <Field as={Input} name="hall" />
                    </td>
                    <td>
                      Kitchen <Field as={Input} name="kitchen" />
                    </td>
                    <td>
                      Bedroom <Field as={Input} name="bedroom" />
                    </td>
                    <td colSpan="2">
                      W.C/Bath <Field as={Input} name="wcBath" />
                    </td>
                  </tr>

                  <tr>
                    <td>Occupancy Details</td>
                    <td colSpan="3">
                      <CheckboxGroup
                        name="occupancy"
                        options={["Self", "Seller", "Rented", "Vacant", "UC"]}
                      />
                    </td>
                    <td>Since How Long</td>
                    <td>
                      <Field as={Input} name="sinceHowLong" />
                    </td>
                  </tr>

                  <tr>
                    <td>Occupant Name/Applicant relation with occupant</td>
                    <td colSpan="3">
                      <Field as={Input} name="occupantRelation" />
                    </td>
                    <td>Rent / Month</td>
                    <td>
                      <Field as={Input} name="rent" />
                    </td>
                  </tr>

                  <tr>
                    <td>Name on Society Board</td>
                    <td colSpan="2">
                      <Field as={Input} name="societyBoard" />
                    </td>
                    <td>Name on Door</td>
                    <td colSpan="2">
                      <Field as={Input} name="nameOnDoor" />
                    </td>
                  </tr>

                  <tr>
                    <td>Age of Property</td>
                    <td>
                      <Field as={Input} name="ageOfProperty" />
                    </td>
                    <td colSpan="2">Electric Meter</td>
                    <td colSpan="2">
                      <CheckboxGroup name="occupancy" options={["Yes", "No"]} />
                    </td>
                  </tr>

                  <tr>
                    <td>Quality of Construction</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="qualityConstruction"
                        options={["Good", "Average", "Poor"]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Exterior Condition</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="exteriorCondition"
                        options={[
                          "Good",
                          "Average",
                          "Poor",
                          "Renovation",
                          "UC",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Interior Condition</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="interiorCondition"
                        options={[
                          "Good",
                          "Average",
                          "Poor",
                          "Renovation",
                          "UC",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center bg-light"
                      style={{ height: "40px" }}
                    ></td>
                  </tr>

                  <tr>
                    <td>Municipal Limits</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="municipalLimits"
                        options={[
                          "Grampanchayath",
                          "Council",
                          "Corporation",
                          "MMRDA",
                          "PMRDA",
                          "MIDC",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Surrounding Area</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="surroundingArea"
                        options={[
                          "Developing Area",
                          "Under Developed",
                          "Fully Developed Core Area",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Amenities in Building</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="amenities"
                        options={[
                          "24-Hrs Security",
                          "Garden",
                          "Park",
                          "Playground",
                          "Gym",
                          "Intercom",
                          "Swimming Pool",
                          "Banquet Hall",
                          "Borewell",
                          "Sump",
                          "Drainage Facility",
                          "Water Supply",
                          "OHT",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Type of Construction</td>
                    <td colSpan="3">
                      <CheckboxGroup
                        name="constructionType"
                        options={["RCC", "Load Bearing", "Steel Structure"]}
                      />
                    </td>
                    <td>Direction of Entrance</td>
                    <td>
                      <Field as={Input} name="entranceDirection" />
                    </td>
                  </tr>

                  <tr>
                    <td>Type of Roof</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="roofType"
                        options={[
                          "BCC Slab",
                          "ACC Sheet",
                          "Mangalore Tiles",
                          "GI Sheet",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Flooring</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="flooring"
                        options={[
                          "Vitrified",
                          "Marbonite",
                          "Ceramic",
                          "Marble Granite",
                          "Italian",
                          "Mosaic",
                          "Kota",
                          "Carpet",
                          "Spartes",
                          "Shahabad Tiles (Kides)",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center bg-light"
                      style={{ height: "40px" }}
                    ></td>
                  </tr>

                  <tr>
                    <td>Paint</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="paint"
                        options={[
                          "Distemper",
                          "Luster",
                          "Oil bond paint",
                          "Weather shield",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Doors</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="doors"
                        options={["Rolling Shutter", "Wooden"]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Windows</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="windows"
                        options={["Sliding windows", "Open able", "Packed"]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Kitchen / Pantry</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="kitchenPantry"
                        options={[
                          "Green Granite",
                          "Black Granite",
                          "Marble - White",
                          "Brown",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Bathrooms</td>
                    <td>
                      <CheckboxGroup
                        name="bathroomsDado"
                        options={["Full", "Half dado"]}
                      />
                    </td>
                    <td>Type of Tiles</td>
                    <td colSpan="4">
                      <Field as={Input} name="bathroomsTiles" />
                    </td>
                  </tr>

                  <tr>
                    <td>Toilet Blocks</td>
                    <td>
                      <CheckboxGroup
                        name="toiletDado"
                        options={["Full", "Half dado"]}
                      />
                    </td>
                    <td>Type of Tiles</td>
                    <td colSpan="4">
                      <Field as={Input} name="toiletTiles" />
                    </td>
                  </tr>

                  <tr>
                    <td>Electrical Fittings</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="electricalFittings"
                        options={[
                          "Open",
                          "Concealed",
                          "Casing Capping",
                          "Black pipe",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Plumbing Fittings</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="plumbingFittings"
                        options={["Open", "Concealed"]}
                      />
                    </td>
                  </tr>

                  {/* ---------- OTHER PROPERTY DETAILS ---------- */}
                  <tr>
                    <td className="bg-light"></td>
                    <td colSpan="3" className="text-center bg-light">
                      <b>Other Details of the Property</b>
                    </td>
                    <td colSpan="2" className="text-center bg-light">
                      <b>Distance in Km</b>
                    </td>
                  </tr>

                  {[
                    ["Landmark", "landmark"],
                    ["Distance from City Centre", "distanceCityCentre"],
                    ["Nearest Bank Branch", "nearestBank"],
                    ["Nearest Railway stn", "nearestRailway"],
                    ["Nearest Bus stop", "nearestBusStop"],
                    ["Nearest Major Road", "nearestMajorRoad"],
                    ["Nearest School / College", "nearestSchool"],
                    ["Nearest Hospital", "nearestHospital"],
                  ].map(([label, name]) => (
                    <tr key={name}>
                      {/* Label */}
                      <td>{label}</td>

                      {/* Other Details */}
                      <td colSpan="3" data-label="Description">
                        <Field as={Input} name={name} />
                      </td>

                      {/* Distance */}
                      <td colSpan="2"  data-label="Distance (Km)">
                        <Field as={Input} name={`${name}Distance`} />
                      </td>
                    </tr>
                  ))}

                  <tr>
                    <td>Condition of Locality</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="localityCondition"
                        options={[
                          "Low",
                          "Middle",
                          "Higher Middle Class",
                          "Higher Class",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Approach Road Type</td>
                    <td colSpan="3">
                      <CheckboxGroup
                        name="approachRoadType"
                        options={["Tar", "Concrete", "Kachha"]}
                      />
                    </td>
                    <td>Approach Road Width - in Feet</td>
                    <td>
                      <Field as={Input} name="approachRoadWidth" />
                    </td>
                  </tr>

                  <tr>
                    <td>Negative Factors with Distance</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="negativeFactors"
                        options={[
                          "Graveyard",
                          "Domination area",
                          "High tension line",
                          "Canal / River / Nala",
                          "Bank notice",
                          "Land Lock",
                        ]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Rate as per Enquiry</td>
                    <td colSpan="2">
                      <CheckboxGroup
                        name="rateAsPerEnquiryType"
                        options={["Plot", "Land", "Shop", "Flat"]}
                      />
                      <Field
                        as={Input}
                        name="rateAsPerEnquiryValue"
                        className="mt-1"
                      />
                    </td>

                    <td>Rate as per Self</td>
                    <td colSpan="2">
                      <CheckboxGroup
                        name="rateAsPerSelfType"
                        options={["Plot", "Land", "Shop", "Flat"]}
                      />
                      <Field
                        as={Input}
                        name="rateAsPerSelfValue"
                        className="mt-1"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>CARPET AREA (Sq.ft)</td>
                    <td colSpan="2">
                      <Field as={Input} name="carpetArea" />
                    </td>
                    <td>BUILTUP AREA (Sq.ft)</td>
                    <td colSpan="2">
                      <Field as={Input} name="builtupArea" />
                    </td>
                  </tr>

                  <tr>
                    <td>Plot Area</td>
                    <td colSpan="5">
                      <Field as={Input} name="plotArea" />
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center bg-light"
                      style={{ height: "40px" }}
                    ></td>
                  </tr>

                  <tr>
                    <td>Stage of Building</td>
                    <td colSpan="5">
                      <CheckboxGroup
                        name="stageOfBuilding"
                        options={["Completed", "Under Construction"]}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Construction Work Active</td>
                    <td colSpan="2">
                      <CheckboxGroup
                        name="constructionActive"
                        options={["Yes", "No"]}
                      />
                    </td>
                    <td>Construction Stopped Since?</td>
                    <td colSpan="2">
                      <Field as={Input} name="constructionStoppedSince" />
                    </td>
                  </tr>

                  <tr>
                    <td>Labour Available</td>
                    <td colSpan="2">
                      <CheckboxGroup
                        name="labourAvailable"
                        options={["Yes", "No"]}
                      />
                    </td>
                    <td>No. of Labours</td>
                    <td colSpan="2">
                      <Field as={Input} name="noOfLabours" />
                    </td>
                  </tr>

                  {/* ---------- STAGES AND FLOORS ---------- */}
                  <tr className="bg-light text-center">
                    <td>
                      <b>Stages</b>
                    </td>
                    <td>%</td>
                    <td colSpan="2">
                      <b>Total Floors</b>
                    </td>
                    <td colSpan="2">
                      <b>Completed Floors</b>
                    </td>
                  </tr>

                  {[
                    ["Foundation", "5", "foundation"],
                    ["Plinth", "5", "plinth"],
                    ["RCC / Slab work", "40", "rcc"],
                    ["Brick work", "10", "brick"],
                    ["External plaster", "10", "externalPlaster"],
                    ["Internal plaster", "10", "internalPlaster"],
                    ["Flooring", "10", "flooring"],
                    ["Electrification", "2.5", "electrification"],
                    ["Plumbing", "2.5", "plumbing"],
                    ["Wood work", "2.5", "woodwork"],
                    ["Painting / Finishing", "2.5", "painting"],
                  ].map(([label, percent, key]) => (
                    <tr key={key}>
                      <td>{label}</td>
                      <td>{percent}</td>
                      <td colSpan="2">
                        <Field
                          as={Input}
                          name={`constructionStages.${key}.total`}
                        />
                      </td>
                      <td colSpan="2">
                        <Field
                          as={Input}
                          name={`constructionStages.${key}.completed`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <div className="text-center mt-3">
            <Button color="primary" type="submit">
              Submit & Download PDF
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TechnicalVisitReport;
