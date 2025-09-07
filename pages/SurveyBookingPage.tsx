import React, { useState } from 'react';
import type { Location } from '../types';
import SurveyProjectDetailsPage from './SurveyProjectDetailsPage';
import SurveyLocationPage from './SurveyLocationPage';
import { allServicesData } from '../data/services';

interface SurveyBookingPageProps {
    categoryName: string;
    onBack: () => void;
    location: Location;
}

const SurveyBookingPage: React.FC<SurveyBookingPageProps> = ({ categoryName, onBack, location }) => {
    const [view, setView] = useState<'projectDetails' | 'location'>('projectDetails');
    const [surveyData, setSurveyData] = useState<any>({ categoryName, location });
    const [locations, setLocations] = useState<Location[]>([location]);

    const handleNextFromProjectDetails = (data: any) => {
        setSurveyData(prev => ({ ...prev, ...data }));
        setView('location');
    };

    const handleBackFromProjectDetails = () => {
        onBack();
    };

    const handleNextFromLocation = (data: any) => {
        const finalSurveyData = { ...surveyData, ...data };
        setSurveyData(finalSurveyData);
        console.log("Final Survey Data from SurveyBookingPage:", finalSurveyData);
        alert("Melanjutkan ke pembayaran survey...");
        onBack();
    };
    
    const handleBackFromLocation = () => {
        setView('projectDetails');
    };

    const handleUpdateSurveyLocation = (locationId: string) => {
        const newLocation = locations.find(loc => loc.id === locationId);
        if (newLocation) {
            setSurveyData(prev => ({
                ...prev,
                location: newLocation,
            }));
        }
    };

    const handleAddAndSetSurveyLocation = ({ name, address }: { name: string; address: string }) => {
        const newLocation: Location = {
            id: new Date().getTime().toString(),
            name,
            address,
        };
        setLocations(prev => [...prev, newLocation]);
        setSurveyData(prev => ({
            ...prev,
            location: newLocation,
        }));
    };

    const categoryImage = allServicesData.find(s => s.category === categoryName)?.image || 'https://picsum.photos/seed/default/200/200';
    const categoryDescription = allServicesData.find(s => s.category === categoryName)?.description || 'Isi detail proyek Anda untuk melanjutkan.';

    if (view === 'location') {
        return (
            <SurveyLocationPage
                categoryName={categoryName}
                onBack={handleBackFromLocation}
                onNext={handleNextFromLocation}
                initialData={surveyData}
                availableLocations={locations}
                // FIX: Add missing onLocationUpdate and onAddNewLocation props to satisfy the SurveyLocationPageProps interface.
                onLocationUpdate={handleUpdateSurveyLocation}
                onAddNewLocation={handleAddAndSetSurveyLocation}
            />
        );
    }

    return (
        <SurveyProjectDetailsPage
            jobTypeName={categoryName}
            categoryGroupName={categoryName}
            jobImage={categoryImage}
            jobDescription={categoryDescription}
            onBack={handleBackFromProjectDetails}
            onNext={handleNextFromProjectDetails}
            initialData={surveyData}
        />
    );
};

export default SurveyBookingPage;