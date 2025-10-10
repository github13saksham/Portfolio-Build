import { useState } from "react";
import type { Resume } from "../../../types/Resume";
import ResumeForm from "../../../components/ui/ResumeForm";
import ResumePreview from "../../../components/Resume-Preview/ResumePreview";

export default function BuildResumePage() {
	const [resume, setResume] = useState<Resume | null>(null);

	return (
		<div className="container">
			{!resume ? (
				<ResumeForm onSave={setResume} />
			) : (
				<div>
					<ResumePreview
						resume={resume}
						onEdit={function (): void {
							throw new Error("Function not implemented.");
						}}
					/>
					<button className="cta-button" onClick={() => setResume(null)}>
						Back & Edit
					</button>
				</div>
			)}
		</div>
	);
}
