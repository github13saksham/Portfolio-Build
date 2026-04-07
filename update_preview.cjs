const fs = require('fs');
const file = 'c:/Users/SAKSHAM/Downloads/RESUMEBUILDER/RESUME BUILDER/src/components/Resume-Preview/ResumePreview.tsx';
let data = fs.readFileSync(file, 'utf8');

const returnStart = data.indexOf('\treturn (');
if (returnStart === -1) {
    console.log("Could not find return statement");
    process.exit(1);
}

const preamble = data.substring(0, returnStart);

const newRender = `	if (template === 'dev-terminal') {
		return <DeveloperLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
	} else if (template === 'neo-creative' || template === 'creative' || template === 'startup-hustle') {
		return <CreativeLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
	}
	
	return <DefaultLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
}

const DefaultLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (`;

const endBrace = data.lastIndexOf('}');
const remainingDefaultLayout = data.substring(returnStart + '\treturn ('.length, endBrace + 1);

const addedLayouts = `
const CreativeLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (
		<div className={\`w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border shadow-2xl \${themeStyles.wrapper} \${themeStyles.font} flex flex-col md:flex-row min-h-[800px]\`}>
			
			{/* Left Sidebar */}
			<div className={\`md:w-1/3 p-8 flex flex-col \${themeStyles.headerBg} \${themeStyles.headerText}\`}>
				{resume.profilePic && (
					<div className="shrink-0 relative mx-auto mb-8">
						<div className="absolute inset-0 bg-white/20 rounded-full blur animate-pulse"></div>
						<img src={resume.profilePic} alt={resume.name} className="w-32 h-32 rounded-full object-cover border-4 border-white/20 relative z-10 shadow-xl" />
					</div>
				)}
				<h1 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight text-center">{resume.name}</h1>
				<p className={\`text-lg opacity-90 font-medium mb-10 text-center uppercase tracking-widest\`}>{resume.bio}</p>
				
				<h3 className="font-bold border-b border-white/20 pb-2 mb-4 mt-auto">Contact Info</h3>
				<div className="flex flex-col gap-y-4 opacity-90 text-sm font-medium mb-12">
					{resume.email && <span>{resume.email}</span>}
					{resume.phone && <span>{resume.phone}</span>}
					{resume.address && <span>{resume.address}</span>}
					{resume.linkedin && <a href={resume.linkedin} target="_blank" className="hover:underline">LinkedIn</a>}
					{resume.github && <a href={resume.github} target="_blank" className="hover:underline">GitHub</a>}
				</div>

				{resume.skills.length > 0 && (
					<>
						<h3 className="font-bold border-b border-white/20 pb-2 mb-4">Core Skills</h3>
						<div className="flex flex-wrap gap-2 mb-8">
							{resume.skills.map((skill, i) => (
								<span key={i} className={\`px-3 py-1.5 rounded-lg text-xs shadow-sm bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10\`}>
									{skill}
								</span>
							))}
						</div>
					</>
				)}
			</div>

			{/* Right Content */}
			<div className="md:w-2/3 p-10 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col">
				{resume.about && (
					<section className="mb-10">
						<h2 className={\`text-2xl font-bold mb-4 uppercase tracking-wider \${themeStyles.accentText} border-b-4 \${themeStyles.borderAccent} inline-block pb-1\`}>Profile</h2>
						<p className="leading-relaxed opacity-90 text-lg text-slate-700 dark:text-slate-300">{resume.about}</p>
					</section>
				)}

				{resume.workExperience.length > 0 && (
					<section className="mb-10">
						<h2 className={\`text-2xl font-bold mb-6 uppercase tracking-wider \${themeStyles.accentText} border-b-4 \${themeStyles.borderAccent} inline-block pb-1\`}>Experience</h2>
						<div className="space-y-8">
							{resume.workExperience.map((work, i) => (
								<div key={i} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
									<div className={\`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 \${themeStyles.bgAccent}\`}></div>
									<h3 className="font-bold text-lg text-slate-900 dark:text-white">{work.position} <span className="text-slate-400 font-normal text-sm block md:inline md:ml-2">— {work.duration}</span></h3>
									<p className={\`font-semibold mb-3 mt-1 \${themeStyles.accentText}\`}>{work.company} {work.title && \`| \${work.title}\`}</p>
									{work.responsibilities && work.responsibilities.length > 0 && (
										<ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
											{work.responsibilities.map((r, j) => <li key={j}>{r}</li>)}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{resume.education.length > 0 && (
					<section className="mb-10">
						<h2 className={\`text-2xl font-bold mb-6 uppercase tracking-wider \${themeStyles.accentText} border-b-4 \${themeStyles.borderAccent} inline-block pb-1\`}>Education</h2>
						<div className="space-y-6">
							{resume.education.map((edu, i) => (
								<div key={i} className="pl-6 border-l-2 border-slate-200 dark:border-slate-700 relative">
									<div className={\`absolute w-3 h-3 rounded-full -left-[7px] top-1.5 \${themeStyles.bgAccent}\`}></div>
									<h3 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
									<p className="text-slate-700 dark:text-slate-300 mt-1">{edu.program} — <span className="text-sm font-semibold opacity-80">{edu.institution}</span></p>
									<p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{edu.duration}</p>
								</div>
							))}
						</div>
					</section>
				)}

				<div className="mt-auto pt-8 flex justify-center border-t border-slate-100 dark:border-slate-800">
					<button onClick={onEdit} className={\`px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-xl \${themeStyles.accentBg}\`}>
						Edit Resume Information
					</button>
				</div>
			</div>
		</div>
	);
};

const DeveloperLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (
		<div className={\`w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border shadow-2xl \${themeStyles.wrapper} \${themeStyles.font} p-10 min-h-[800px] flex flex-col\`}>
			<div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-700 pb-8 mb-8">
				<div>
					<h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-3">&gt; {resume.name.replace(' ', '_')}_</h1>
					<p className="text-gray-400 text-lg">{resume.bio}</p>
				</div>
				<div className="text-right text-sm text-gray-400 space-y-2 mt-4 md:mt-0">
					{resume.email && <p>user@email: {resume.email}</p>}
					{resume.phone && <p>user@phone: {resume.phone}</p>}
					{resume.github && <p>user@github: {resume.github.replace('https://', '')}</p>}
					{resume.linkedin && <p>user@linkedin: {resume.linkedin.replace('https://', '').replace('www.', '')}</p>}
				</div>
			</div>

			{resume.about && (
				<div className="mb-10">
					<h2 className="text-2xl font-bold text-blue-400 mb-4 block border-b border-gray-800 pb-2">## About_Me</h2>
					<p className="text-gray-300 leading-relaxed text-lg">{resume.about}</p>
				</div>
			)}
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				<div>
					{resume.workExperience.length > 0 && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold text-purple-400 mb-6 block border-b border-gray-800 pb-2">## Experience</h2>
							<div className="space-y-8">
								{resume.workExperience.map((work, i) => (
									<div key={i} className="mb-4">
										<p className="text-emerald-300 font-bold text-lg mb-1">{work.position} <span className="text-gray-500 float-right text-sm">{work.duration}</span></p>
										<p className="text-blue-400 mb-3">@ {work.company}</p>
										{work.responsibilities && (
											<ul className="list-none space-y-2 text-sm text-gray-400">
												{work.responsibilities.map((r, j) => <li key={j}><span className="text-purple-500 mr-2">*</span>{r}</li>)}
											</ul>
										)}
									</div>
								))}
							</div>
						</div>
					)}
					
					{resume.education.length > 0 && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold text-cyan-400 mb-6 block border-b border-gray-800 pb-2">## Education</h2>
							<div className="space-y-6">
								{resume.education.map((edu, i) => (
									<div key={i}>
										<p className="text-cyan-300 font-bold mb-1">{edu.degree}</p>
										<p className="text-gray-400 text-sm mb-1">{edu.institution} | {edu.program}</p>
										<p className="text-gray-500 text-xs">{edu.duration}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				
				<div>
					{resume.skills.length > 0 && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold text-yellow-400 mb-4 block border-b border-gray-800 pb-2">## Skills.json</h2>
							<pre className="bg-black/50 p-6 rounded-lg text-sm text-emerald-300 border border-gray-800 overflow-x-auto shadow-inner">
{\`{
  "skills": [
\${resume.skills.map(s => \`    "\${s}"\`).join(',\\n')}
  ]
}\`}
							</pre>
						</div>
					)}
					
					{resume.projects.length > 0 && (
						<div className="mb-10">
							<h2 className="text-2xl font-bold text-pink-400 mb-6 block border-b border-gray-800 pb-2">## Projects</h2>
							<div className="space-y-6">
								{resume.projects.map((proj, i) => (
									<div key={i} className="border border-gray-800 p-4 bg-gray-900/50 rounded-lg">
										<p className="text-pink-300 font-bold mb-2">[{proj.title}]</p>
										<p className="text-gray-400 text-sm">{proj.description}</p>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="mt-auto pt-8 flex justify-center border-t border-gray-800">
				<button onClick={onEdit} className={\`px-8 py-3 rounded-xl font-bold transition-all hover:bg-gray-800 border border-gray-700 bg-black text-emerald-400\`}>
					sudo edit_resume_info
				</button>
			</div>
		</div>
	);
};
`

fs.writeFileSync(file, preamble + newRender + remainingDefaultLayout + '\n' + addedLayouts, 'utf8');
console.log('Update Complete.');
