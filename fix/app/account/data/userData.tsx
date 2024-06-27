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

      alert('Fanclub updated!');
    } catch (error: any) {
      console.error('Error updating Fanclub:', error.message);
      alert('Error updating Fanclub!');
    } finally {
      setLoading(false);
    }
  }

  async function updateNachname(nachname: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ nachname })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Nachname updated!');
    } catch (error: any) {
      console.error('Error updating Nachname:', error.message);
      alert('Error updating Nachname!');
    } finally {
      setLoading(false);
    }
  }

  async function updateVorname(vorname: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ vorname })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Vorname updated!');
    } catch (error: any) {
      console.error('Error updating Vorname:', error.message);
      alert('Error updating Vorname!');
    } finally {
      setLoading(false);
    }
  }

  // async function updateEmail(e_mail: string) {
  //   try {
  //     setLoading(true);

  //     if (!userDatas) {
  //       throw new Error('Userdatas not loaded');
  //     }

  //     const { error } = await supabase
  //       .from('userdatas')
  //       .update({ e_mail })
  //       .eq('id', userDatas.id);

  //     if (error) {
  //       throw error;
  //     }

  //     alert('E-Mail updated!');
  //   } catch (error: any) {
  //     console.error('Error updating E-Mail:', error.message);
  //     alert('Error updating E-Mail!');
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function updateAdresse(adresse: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ adresse })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Adresse updated!');
    } catch (error: any) {
      console.error('Error updating Adresse:', error.message);
      alert('Error updating Adresse!');
    } finally {
      setLoading(false);
    }
  }

  async function updatePLZ(plz: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ plz })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('PLZ updated!');
    } catch (error: any) {
      console.error('Error updating PLZ:', error.message);
      alert('Error updating PLZ!');
    } finally {
      setLoading(false);
    }
  }

  async function updateOrt(ort: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ ort })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Ort updated!');
    } catch (error: any) {
      console.error('Error updating Ort:', error.message);
      alert('Error updating Ort!');
    } finally {
      setLoading(false);
    }
  }

  async function updateLand(land: string) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ land })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Land updated!');
    } catch (error: any) {
      console.error('Error updating Land:', error.message);
      alert('Error updating Land!');
    } finally {
      setLoading(false);
    }
  }

  async function updateGebDatum(geb_datum: Date | null) {
    try {
      setLoading(true);

      if (!userDatas) {
        throw new Error('Userdatas not loaded');
      }

      const { error } = await supabase
        .from('userdatas')
        .update({ geb_datum })
        .eq('id', userDatas.id);

      if (error) {
        throw error;
      }

      alert('Geburtsdatum updated!');
    } catch (error: any) {
      console.error('Error updating Geburtsdatum:', error.message);
      alert('Error updating Geburtsdatum!');
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
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                telefon: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateTelefon(userDatas?.telefon)}>Update Telefon</Button>
        </div>
        <div>
          <label htmlFor="fanclub">Fanclub</label>
          <input
            id="fanclub"
            type="text"
            value={userDatas?.fanclub || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                fanclub: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateFanclub(userDatas?.fanclub)}>Update Fanclub</Button>
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
        <div>
          <label htmlFor="nachname">Nachname</label>
          <input
            id="nachname"
            type="text"
            value={userDatas?.nachname || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                nachname: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateNachname(userDatas?.nachname)}>Update Nachname</Button>
        </div>
        <div>
          <label htmlFor="vorname">Vorname</label>
          <input
            id="vorname"
            type="text"
            value={userDatas?.vorname || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                vorname: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateVorname(userDatas?.vorname)}>Update Vorname</Button>
        </div>
        <div>
          <label htmlFor="adresse">Adresse</label>
          <input
            id="adresse"
            type="text"
            value={userDatas?.adresse || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                adresse: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateAdresse(userDatas?.adresse)}>Update Adresse</Button>
        </div>
        <div>
          <label htmlFor="plz">PLZ</label>
          <input
            id="plz"
            type="text"
            value={userDatas?.plz || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                plz: e.target.value,
              }))
            }
          />
          <Button onClick={() => updatePLZ(userDatas?.plz)}>Update PLZ</Button>
        </div>
        <div>
          <label htmlFor="ort">Ort</label>
          <input
            id="ort"
            type="text"
            value={userDatas?.ort || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                ort: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateOrt(userDatas?.ort)}>Update Ort</Button>
        </div>
        <div>
          <label htmlFor="land">Land</label>
          <input
            id="land"
            type="text"
            value={userDatas?.land || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                land: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateLand(userDatas?.land)}>Update Land</Button>
        </div>
        <div>
          <label htmlFor="gebDatum">Geburtsdatum</label>
          <input
            id="gebDatum"
            type="date"
            value={userDatas?.geb_datum || ''}
            onChange={(e) =>
              setUserDatas((prevUserDatas: any) => ({
                ...prevUserDatas,
                geb_datum: e.target.value,
              }))
            }
          />
          <Button onClick={() => updateGebDatum(userDatas?.geb_datum)}>Update Geburtsdatum</Button>
        </div>
  
        {/* Display other fields from userdatas as needed */}
        {userDatas && (
          <div>
            <h2>User Data Details</h2>
            {/* Example additional fields */}
            <p>Nachname: {userDatas.nachname}</p>
            <p>Vorname: {userDatas.vorname}</p>
            <p>Adresse: {userDatas.adresse}</p>
            <p>PLZ: {userDatas.plz}</p>
            <p>Ort: {userDatas.ort}</p>
            <p>Land: {userDatas.land}</p>
            <p>Geburtsdatum: {userDatas.geb_datum}</p>
            {/* Display other fields from userdatas as needed */}
          </div>
        )}
      </div>
    </Card>
  );  
}
