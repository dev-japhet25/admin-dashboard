import React, { useState } from 'react';
import Popover from '@/components/Popover';
import Button from '@/components/Button';
import { sendSlackCommand } from '@/lib/api';

interface Category {
  id: string;
  name: string;
}

const CategoriesCommand: React.FC = () => {
  const [entityType, setEntityType] = useState<string>('');
  const [entityId, setEntityId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');
  const handleEntityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEntityType(e.target.value);
  };

  const handleEntityIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityId(e.target.value);
  };

  const handleSubmit = async () => {
    if (!entityType || !entityId) {
      setError("Please select an entity type and enter an entity ID.");
      return;
    }

    const commandText = `${entityType} ${entityId}`;
    setLoading(true);

    try {
      const result = await sendSlackCommand("/categories", commandText); // Ensure this function is defined
      console.log(result);

      // Parse the categories from the response text
      const categoryLines = result.split('\n').filter(line => line.trim());
      const parsedCategories = categoryLines.slice(2).map(line => {
        const [id, name] = line.split('-');
        return { id: id.trim(), name: name.trim() };
      });
      setCategories(parsedCategories); // Set parsed categories
    } catch (error) {
      console.error("An error occurred while fetching categories:", error);
    } 
      setLoading(false);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-2/3">
        <div className="flex justify-between my-6">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Categories Command
          </h2>
          <div>
            <Popover title="Categories Command">
              <h3 className="font-semibold text-lg mb-2">/categories Command</h3>
              <p><strong>Purpose:</strong> Used to fetch and display categories for a specified branch or church.</p>
              <p><strong>Parameters:</strong>
                <ul>
                  <li><strong>Entity Type:</strong> "branch" or "church".</li>
                  <li><strong>Entity ID:</strong> The ID of the branch or church.</li>
                </ul>
              </p>
              <p><strong>Functionality:</strong> Retrieves and lists contribution categories for the specified branch or church.</p>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          {/* Entity Type Select */}
          <div>
            <label htmlFor="entityTypeSelect" className="block mb-2 text-md font-medium text-gray-900">
              Entity Type
            </label>
            <select
              id="entityTypeSelect"
              value={entityType}
              onChange={handleEntityTypeChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
            >
              <option value="">Select Entity Type</option>
              <option value="branch">Branch</option>
              <option value="church" disabled>Church [Not working currently]</option>
            </select>
          </div>

          {/* Entity ID Input */}
          <div>
            <label htmlFor="entityId" className="block mb-2 text-md font-medium text-gray-900">
              Entity ID
            </label>
            <input
              type="text"
              id="entityId"
              value={entityId}
              onChange={handleEntityIdChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
              placeholder="Enter entity ID"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="my-6 text-center">
          <Button handleSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Categories List */}
        {categories.length > 0 && (
          <div className="my-6 text-gray-700">
            <h3 className="text-lg font-semibold">Categories List</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="flex items-center my-6">
                  <span className="inline-block w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-7">
                    {category.id}
                  </span>
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesCommand;