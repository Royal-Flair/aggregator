'use client';
import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { type User } from '@supabase/supabase-js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<string>('');
  const [userDatas, setUserDatas] = useState<any>(null); 

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('users')
        .select(`full_name, userdatas`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.error(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);

        // If userdatas field is not null, fetch additional data from userdatas table
        if (data.userdatas) {
          const { data: fetchedUserDatas, error: userDatasError } = await supabase
            .from('userdatas')
            .select('*')
            .eq('id', data.userdatas)
            .single();

          if (fetchedUserDatas && !userDatasError) {
            setUserDatas(fetchedUserDatas);
            // Example mapping memberId from userdatas
            setMemberId(fetchedUserDatas.memberid.toString());
            // Set other fields as needed
          }
        }
      }
    } catch (error: any) {
      console.error('Error loading user data:', error.message);
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);

      // Example upsert operation, adjust as per your actual schema
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user?.id as string,
          full_name: fullname,
          userdatas: memberId ? parseInt(memberId) : null,
        });

      if (error) {
        throw error;
      }

      alert('Profile updated!');
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile!');
    } finally {
      setLoading(false);
    }
  }

  async function updateTelefon(telefon: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ telefon })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Telefon updated!');
    } catch (error: any) {
      console.error('Error updating telefon:', error.message);
      alert('Error updating telefon!');
    } finally {
      setLoading(false);
    }
  }

  async function updateFanclub(fanclub: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ fanclub })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Telefon updated!');
    } catch (error: any) {
      console.error('Error updating telefon:', error.message);
      alert('Error updating telefon!');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitMemberId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('userdatas')
        .select('*')
        .eq('memberid', parseInt(memberId))
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUserDatas(data);
        alert('Member data found and loaded!');
      } else {
        alert('Member data not found!');
      }
    } catch (error: any) {
      console.error('Error fetching member data:', error.message);
      alert('Error fetching member data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Your Profile"
      footer={
        <Button
          variant="slim"
          onClick={updateProfile}
          disabled={loading}
          loading={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      }
    >
      <div className="form-widget">
        <form onSubmit={handleSubmitMemberId}>
          <div>
            <label htmlFor="memberId">Member ID</label>
            <input
              id="memberId"
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </div>
          <Button type="submit">Fetch Member Data</Button>
        </form>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={user?.email} disabled />
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="telefon">Telefon</label>
          <input
            id="telefon"
            type="text"
            value={userDatas?.telefon || ''}
            onChange={(e) => {
              const newTelefon = e.target.value;
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                telefon: newTelefon,
              }));
            }}
          />
          <Button onClick={() => updateTelefon(userDatas?.telefon)}>Update Telefon</Button>
        </div>
        <div>
          <label htmlFor="fanclub">Fanclub</label>
          <input
            id="fanclub"
            type="text"
            value={userDatas?.fanclub || ''}
            onChange={(e) => {
              const newFanclub = e.target.value;
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                fanclub: newFanclub,
              }));
            }}
          />
          <Button onClick={() => updateFanclub(userDatas?.fanclub)}>Update fanclub</Button>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Display userdatas if available */}
        {userDatas && (
          <div>
            <h2>User Data Details</h2>
            <p>Member ID: {userDatas.memberid}</p>
            <p>Telefon: {userDatas.telefon}</p>
            <p>Fanclub: {userDatas.fanclub}</p>
            {/* Display other fields from userdatas as needed */}
          </div>
        )}
      </div>
    </Card>
  );
}
