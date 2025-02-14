import { AppBar } from "./components/AppBar";
import { Hero } from "./components/Hero";
import { Upload } from "./components/Upload";
import { UploadImage } from "./components/UploadImage";


export default function Home() {
    return (
        <div>
            <AppBar />
            <Hero />
            <Upload />
        </div>
    );
}

