"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
  Select,
  Toggle,
  Btn,
  Badge,
  Toast,
} from "../../components/Shared/AdminUi";
import {
  adminSeriesCreate,
  adminTestList,
  adminTestUpdate,
} from "../../action/admin";

const SECTION_CONFIG = [
  {
    key: "listeningTest",
    label: "Listening Test",
    icon: "🎧",
    color: "blue",
    duration: "40 min",
  },
  {
    key: "readingTest",
    label: "Reading Test",
    icon: "📖",
    color: "green",
    duration: "60 min",
  },
  {
    key: "writingTest",
    label: "Writing Test",
    icon: "✍️",
    color: "orange",
    duration: "60 min",
  },
];

export default function FullTestCreator({ initial, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [testOptions, setTestOptions] = useState({
    listeningTest: [],
    readingTest: [],
    writingTest: [],
  });

  const [form, setForm] = useState(() => {
    if (initial?._id) {
      // Edit mode
      return {
        _id: initial._id,
        seriesId: initial.seriesId || "",
        seriesNumber: initial.seriesNumber || 1,
        title: initial.title || "",
        difficulty: initial.difficulty || "Medium",
        isPublished: initial.isPublished || false,
        isFreeScoring: initial.isFreeScoring || false,
        listeningTest: initial.listeningTest || "",
        readingTest: initial.readingTest || "",
        writingTest: initial.writingTest || "",
      };
    } else {
      // Create mode
      return {
        seriesId: "",
        seriesNumber: 1,
        title: "",
        difficulty: "Medium",
        isPublished: false,
        isFreeScoring: false,
        listeningTest: "",
        readingTest: "",
        writingTest: "",
      };
    }
  });

  const isEditMode = !!form._id;

  // Load available tests when series changes
  useEffect(() => {
    if (!form.seriesId) return;
    const load = async () => {
      try {
        const [L, R, W] = await Promise.all([
          adminTestList("listening", 1, form.seriesId),
          adminTestList("reading", 1, form.seriesId),
          adminTestList("writing", 1, form.seriesId),
        ]);
        setTestOptions({
          listeningTest: L.data?.data || L.data || [],
          readingTest: R.data?.data || R.data || [],
          writingTest: W.data?.data || W.data || [],
        });
      } catch (error) {
        console.error("Error loading tests:", error);
        setToast({ msg: "Failed to load tests", type: "error" });
      }
    };
    load();
  }, [form.seriesId]);

  const save = async (publish = false) => {
    if (!form.seriesId || !form.title)
      return setToast({
        msg: "Series ID and title are required",
        type: "error",
      });

    setSaving(true);
    try {
      const payload = {
        ...form,
        isPublished: publish,
        sectionsAvailable: {
          listening: !!form.listeningTest,
          reading: !!form.readingTest,
          writing: !!form.writingTest,
        },
      };

      let res;
      if (form._id) {
        // Update existing test
        res = await adminTestUpdate("full", form._id, payload);
        setToast({
          msg: `Full test updated!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      } else {
        // Create new test
        res = await adminSeriesCreate(payload);

        console.log(res);

        setToast({
          msg: `Full test created!${publish ? " (Published)" : " (Draft)"}`,
          type: "success",
        });
      }

      onSaved?.(res.data._id);
    } catch (e) {
      const error = e;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error(message);
      setToast({ msg: message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const selectedTest = (key) =>
    testOptions[key].find((t) => t._id === form[key]);

  return (
    <div className="space-y-6">
      {/* Identity */}
      <Card>
        <CardHeader
          title="Full Mock Test Info"
          subtitle="This bundles Listening + Reading + Writing into one test"
        />
        <CardBody className="grid sm:grid-cols-2 gap-5">
          <div>
            <Label required>Series ID</Label>
            <Input
              value={form.seriesId}
              onChange={(v) => setForm({ ...form, seriesId: v })}
              placeholder="e.g. IELTSmill-series-13"
              disabled={isEditMode}
            />
            <p className="text-[10px] text-slate-400 mt-1">
              {isEditMode
                ? "Cannot change series ID"
                : "Tests from this series will be loaded below"}
            </p>
          </div>
          <div>
            <Label required>Series Number</Label>
            <Input
              type="number"
              value={form.seriesNumber}
              onChange={(v) =>
                setForm({ ...form, seriesNumber: parseInt(v) || 1 })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label required>Full Test Title</Label>
            <Input
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              placeholder="e.g. Mock Test - 04"
            />
          </div>
          <div>
            <Label>Difficulty</Label>
            <Select
              value={form.difficulty}
              onChange={(v) => setForm({ ...form, difficulty: v })}
              options={[
                { value: "Easy", label: "Easy" },
                { value: "Medium", label: "Medium" },
                { value: "Hard", label: "Hard" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Toggle
              checked={form.isFreeScoring}
              onChange={(v) => setForm({ ...form, isFreeScoring: v })}
              label="Free Scoring"
            />
            <Toggle
              checked={form.isPublished}
              onChange={(v) => setForm({ ...form, isPublished: v })}
              label={isEditMode ? "Currently published" : "Publish immediately"}
            />
          </div>
        </CardBody>
      </Card>

      {/* Section pickers */}
      <Card>
        <CardHeader
          title="Assemble Sections"
          subtitle="Pick the individual tests to include. All 3 are optional — you can publish a partial full test."
        />
        <CardBody className="space-y-4">
          {SECTION_CONFIG.map(({ key, label, icon, color, duration }) => {
            const opts = testOptions[key];
            const selected = selectedTest(key);
            return (
              <div
                key={key}
                className="border border-slate-200 rounded-2xl overflow-hidden">
                <div
                  className={`flex items-center justify-between px-5 py-3 bg-${color}-50 border-b border-${color}-100`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <div>
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        · {duration}
                      </span>
                    </div>
                  </div>
                  {selected ? (
                    <Badge color="green">✓ Selected</Badge>
                  ) : (
                    <Badge color="gray">Not set</Badge>
                  )}
                </div>
                <div className="p-4">
                  {!form.seriesId ? (
                    <p className="text-xs text-slate-400 italic">
                      Enter a Series ID above to load available tests
                    </p>
                  ) : opts.length === 0 ? (
                    <p className="text-xs text-amber-600">
                      No published {label.toLowerCase()}s found for series{" "}
                      {form.seriesId}
                      <button
                        className="underline ml-1"
                        onClick={() =>
                          window.open(
                            `/admin/tests/${key.replace("Test", "")}`,
                            "_blank",
                          )
                        }>
                        Create one →
                      </button>
                    </p>
                  ) : (
                    <div className="space-y-3">
                      <Select
                        value={form[key] || ""}
                        onChange={(v) => setForm({ ...form, [key]: v })}
                        options={opts.map((t) => ({
                          value: t._id,
                          label: `${t.title} (${t.difficulty})`,
                        }))}
                        placeholder={`Choose ${label}…`}
                      />
                      {selected && (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg">
                            {icon}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">
                              {selected.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Difficulty: {selected.difficulty}
                            </p>
                          </div>
                          <button
                            className="ml-auto text-xs text-slate-300 hover:text-red-500 transition-colors"
                            onClick={() => setForm({ ...form, [key]: "" })}>
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader title="Summary" />
        <CardBody>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {SECTION_CONFIG.map(({ key, label, icon, duration }) => {
              const has = !!form[key];
              return (
                <div
                  key={key}
                  className={`rounded-xl p-3 text-center border ${has ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200"}`}>
                  <div className="text-xl mb-1">{icon}</div>
                  <p className="text-xs font-bold text-slate-600">{label}</p>
                  <p className="text-[10px] text-slate-400">{duration}</p>
                  <div className="mt-1.5">
                    {has ? (
                      <span className="text-[10px] font-bold text-green-600">
                        ✓ Included
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        Not included
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Btn
              variant="secondary"
              size="lg"
              onClick={() => save(false)}
              disabled={saving}>
              {saving
                ? "Saving…"
                : isEditMode
                  ? "Save Changes"
                  : "Save as Draft"}
            </Btn>
            <Btn
              variant="primary"
              size="lg"
              onClick={() => save(true)}
              disabled={saving}>
              {saving
                ? "Saving…"
                : isEditMode
                  ? "Update & Publish"
                  : "Publish Full Test"}
            </Btn>
          </div>
        </CardBody>
      </Card>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
