const fs = require('fs');
const file = 'src/components/Resume-Preview/ResumePreview.tsx';
let txt = fs.readFileSync(file, 'utf8');
const lines = txt.split(/\r?\n/);
let output = lines.slice(168).join('\n');

const router = `	if (template === 'dev-terminal') {
		return <DeveloperLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
	} else if (template === 'neo-creative' || template === 'creative' || template === 'startup-hustle') {
		return <CreativeLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
	}
	
	return <DefaultLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
}

const DefaultLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (`;

output = output.replace('\treturn (', router);

fs.writeFileSync(file, output);
console.log('Fixed syntax error by returning only the clean layout router.');
