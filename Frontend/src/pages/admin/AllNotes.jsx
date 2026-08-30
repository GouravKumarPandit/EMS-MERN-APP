import { Search } from "lucide-react";
import CardHeader from "../../components/Layout/CardHeader";
import NoteCard from "../../components/Notes/NoteCard";
import { useState } from "react";
import CreateEditNote from "../../components/Notes/CreateEditNote";
import { getAllNotes } from "../../api/note";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Input from "../../components/Ui/Input";
import NoNotes from "../../components/Notes/NoNotes";
import { noteColors } from "../../data/colors"
import DeleteNoteModal from "../../components/Notes/DeleteNoteModal";

export default function AllNotes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedNote, setSelectedNote] = useState(null);
    const [search, setSearch] = useState("");
    const [formData, setFormData] = useState({
        notes: "",
        notes_description: "",
    });
    const [notes, setNotes] = useState([]);

    const colors = Object.keys(noteColors);

    const openCreateModal = () => {
        setModalMode("create");
        setSelectedNote(null);
        setFormData({
            notes: "",
            notes_description: "",
        });
        setIsModalOpen(true);
    };

    const openEditModal = (note) => {
        setModalMode("edit");
        setSelectedNote(note);
        setFormData({
            id: note._id,
            notes: note.notes,
            notes_description: note.notes_description,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
        setFormData({
            notes: "",
            notes_description: "",
        });
    };

    const inputHandler = (event) => {
        const { name, value } = event.target;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setFormData((prev) => ({
            ...prev,
            color: randomColor,
            [name]: value,
        }));
    };

    const openDeleteModal = (note) => {
        setSelectedNote(note);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedNote(null);
    };

    useEffect(() => {
        const fetchAllNotes = async () => {
            try {
                const response = await getAllNotes(search);
                if(response.data.success) setNotes(response.data.data);
            } catch (error) {
                toast.error(error?.response?.data.message);
            }
        }

        fetchAllNotes();
    }, [search, isModalOpen, isDeleteModalOpen])

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-6">
            <CardHeader 
                cardHeading="Your Notes" 
                headingDescription="Keep track of your thoughts, ideas and important reminders" 
                buttonText="+ Create Note" 
                onClick={() => openCreateModal("create")}
            />

            <div className="mb-6 flex items-center justify-between">
                <div
                    className="flex h-11 w-80 items-center gap-3 rounded-lg border border-neutral-800 bg-neutral-950 px-4">
                    <Search
                        size={18}
                        className="text-neutral-500"
                    />

                    <Input
                        onChange={(e) => {setSearch(e.target.value)}}
                        type="text"
                        placeholder="Search notes..."
                        className="w-full bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-600"/>
                </div>

                <p className="text-sm text-neutral-500">
                    {notes.length} Notes
                </p>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {notes.length ? notes.map((note) => {
                    const color = noteColors[note.color];
                    return (
                        <NoteCard note={note} color={color} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />
                    );
                }) : 
                    <NoNotes 
                        cardHeading="No Notes Found" 
                        cardDescription="You don't have any notes yet. Create your first note to keep track of important thoughts and reminders."
                        buttonText="Create Note"
                        openCreateModal={openCreateModal} 
                    />
                }
            </div>

            <CreateEditNote 
                isModalOpen={isModalOpen} modalMode={modalMode} closeModal={closeModal} 
                formData={formData} setFormData={setFormData} inputHandler={inputHandler} 
            />
            <DeleteNoteModal selectedNote={selectedNote} isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} />
        </div>
    );
}
