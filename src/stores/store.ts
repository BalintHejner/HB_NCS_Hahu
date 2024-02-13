import { defineStore } from "pinia";
import { Notify, Loading } from "quasar";
import { api } from "src/boot/axios";
// import router from "src/router";

// === INTERFACES ===
// Convert JSON document to TS Interface quickly: https://transform.tools/json-to-typescript

export interface IApp {
  showEditDialog: boolean;
  showNewDialog: boolean;
  filter: string;
  selectedMany: Array<IMany>;
  selectedOne: Array<IOne>;
  yesNoComp: {
    kérdés: string;
    pozitívGomb: string;
    negatívGomb: string;
    válasz?: boolean;
  }
}

export interface IOne {
  id?: number;
  categoryNameField?: string;
}

export interface IMany {
  id?: number; // PK
  categoryId?: number; // FK
  titleField?: string;
  descField?: string;
  dateField?: string;
  boolField?: boolean;
  priceField?: number;
  imgField?: string;
  category?: IOne;
}

export interface IOther {
  id?: number; // PK
}

interface IState {
  one: {
    // For handle CRUD operations:
    document: IOne; // use for create, update, delete and store one document
    documentOld: IOne; // use for only edit (diff and restore)
    documents: IOne[]; // use for only store many documents
  };
  many: {
    document: IMany;
    documentOld: IMany;
    documents: IMany[];
  };
  other: {
    document: IOther;
    documentOld: IOther;
    documents: IOther[];
  };
  app: IApp;
}

export const useStore = defineStore({
  id: "store",
  state: (): IState => ({
    one: {
      document: {},
      documentOld: {},
      documents: [],
    },
    many: {
      document: {},
      documentOld: {},
      documents: [],
    },
    other: {
      document: {},
      documentOld: {},
      documents: [],
    },
    app: {
      showEditDialog: false,
      showNewDialog: false,
      filter: "",
      selectedMany: [],
      selectedOne: [],
      yesNoComp:{
        kérdés: "Igen vagy nem?",
        pozitívGomb: "Igen",
        negatívGomb: "Nem"
      }
    },
  }),
  getters: {},
  actions: {
    async one_GetAll(): Promise<void> {
      Loading.show();
      this.one.documents = [];
      api
        .get("api/categories")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.one.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async many_GetAll(): Promise<void> {
      Loading.show();
      this.many.documents = [];
      api
        .get("api/advertisements")
        .then((res) => {
          Loading.hide();
          if (res?.data) {
            this.many.documents = res.data;
          }
        })
        .catch((error) => {
          ShowErrorWithNotify(error);
        });
    },

    async many_GetById(): Promise<void> {
      if (this.many?.document?.id) {
        Loading.show();
        api
          .get(`api/advertisements/${this.many.document.id}`)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              this.many.document = res.data;
              // store startig data to PATCH method:
              Object.assign(this.many.documentOld, this.many.document);
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },

    async many_Filter(): Promise<void> {
      if (this.app?.filter) {
        this.many.documents = [];
        // Loading.show();
        api
          .get(`advertisements?_expand=category&q=${this.app.filter}`)
          .then((res) => {
            // Loading.hide();
            if (res?.data) {
              this.many.documents = res.data;
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },

    async many_EditById(): Promise<void> {
      if (this.many?.document?.id) {
        const diff: any = {};
        // the diff object only stores changed fields:
        Object.keys(this.many.document).forEach((k, i) => {
          const newValue = Object.values(this.many.document)[i];
          const oldValue = Object.values(this.many.documentOld)[i];
          if (newValue != oldValue) diff[k] = newValue;
        });
        if (Object.keys(diff).length == 0) {
          Notify.create({
            message: "Nothing changed!",
            color: "negative",
          });
        } else {
          Loading.show();
          api
            .patch(`api/advertisements/${this.many.document.id}`, diff)
            .then((res) => {
              Loading.hide();
              if (res?.data?.id) {
                this.many_GetAll(); // refresh dataN with read all data again from backend
                Notify.create({
                  message: `Document with id=${res.data.id} has been edited successfully!`,
                  color: "positive",
                });
              }
            })
            .catch((error) => {
              ShowErrorWithNotify(error);
            });
        }
      }
    },

    async many_DeleteById(): Promise<void> {
      if (this.many?.document?.id) {
        Loading.show();
        api
          .delete(`api/advertisements/${this.many.document.id}`)
          .then(() => {
            Loading.hide();
            this.many_GetAll(); // refresh dataN with read all data again from backend
            Notify.create({
              message: `Document with id=${this.many.document.id} has been deleted successfully!`,
              color: "positive",
            });
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },

    async many_Create(): Promise<void> {
      if (this.many?.document) {
        Loading.show();
        api
          .post("api/advertisements", this.many.document)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              this.many_GetAll(); // refresh dataN with read all data again from backend
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              // router.push("/page_path");
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },

    async other_Create(): Promise<void> {
      if (this.other?.document) {
        Loading.show();
        api
          .post("api/xyz", this.other.document)
          .then((res) => {
            Loading.hide();
            if (res?.data) {
              Loading.hide();
              Notify.create({
                message: `New document with id=${res.data.id} has been saved successfully!`,
                color: "positive",
              });
              // router.push("/page_path");
            }
          })
          .catch((error) => {
            ShowErrorWithNotify(error);
          });
      }
    },
  },
  // all "state" data is stored in browser session store:
  persist: {
    enabled: true,
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     { storage: sessionStorage, paths: ["one", "many"] },
  //     { storage: localStorage, paths: ["app"] },
  //   ],
  // },
});

Notify.setDefaults({
  position: "top",
  textColor: "yellow",
  timeout: 3000,
  actions: [{ icon: "close", color: "white" }],
});

function ShowErrorWithNotify(error: any): void {
  Loading.hide();
  let msg = "Hiba!";

  // The optional chaining (?.) operator accesses an object's property or calls a function.
  // If the object accessed or function called is undefined or null,
  // it returns undefined instead of throwing an error.
  if (error?.response?.data?.status) {
    msg += ` (${error.response.data.status}):`;
  } else if (error?.response?.status) {
    msg += ` (${error.response.status}):`;
  } else {
    msg += ":";
  }

  if (error?.response?.data?.message) {
    msg += ` ${error.response.data.message}`;
  } else if (error?.response?.message) {
    msg += ` ${error.response.message}`;
  } else if (error?.request && error?.message) {
    msg += ` No response(${error.message})`; // if no response
  } else if (error?.message) {
    msg += ` Message(${error.message})`;
  } else {
    msg += " Unknow error message";
  }
  Notify.create({ message: msg, color: "negative" });
}
