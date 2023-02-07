import { backendUrl } from '@/util/globalVars';
import {
  AccountModel,
  AccountRequest,
  ChangePinRequest,
  MessageModel,
  UserModel,
} from '@/util/types';

export const test = 1;

const defaultHeader = { 'Content-type': 'application/json' };

export async function validateSession(token: string) {
  try {
    if (token) {
      const res = await fetch(`${backendUrl}/validate/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      return res.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${backendUrl}/login/`, {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify({ username: email, password: password }),
    });

    if (res.status == 400) return 400;

    return res.json();
  } catch (error) {
    return 500;
  }
}

export async function logout(token: string) {
  try {
    const res = await fetch(`${backendUrl}/logoutall/`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(''),
    });

    return res.status;
  } catch (error) {
    return 500;
  }
}

export async function getUser(
  email: string,
  password: string
): Promise<UserModel | null> {
  try {
    const res = await fetch(
      `${backendUrl}/users/?email=${email}&password=${password}`
    );

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function searchUserEmail(email: string): Promise<number> {
  try {
    const res = await fetch(`${backendUrl}/search-user/?email=${email}`);

    return res.status;
  } catch (error) {
    return 500;
  }
}

export async function createUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<boolean> {
  try {
    const user: UserModel = {
      username: username,
      email: email,
      password: password,
      avatar: null,
      isAdmin: false,
      lastLogin: null,
    };

    await fetch(`${backendUrl}/register/`, {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(user),
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function getAccounts(
  email: string,
  bankName: string
): Promise<AccountModel[] | null> {
  const res = await fetch(
    `${backendUrl}/accounts?email=${email}&bankName=${bankName}`,
    {
      next: { revalidate: 30 },
    }
  );

  if (!res.ok) return null;

  const accounts: AccountModel[] = await res.json();
  if (accounts.length == 0) return null;

  return accounts;
}

export async function getAllAccounts(
  email: string
): Promise<AccountModel[] | null> {
  try {
    const res = await fetch(`${backendUrl}/all-accounts/?email=${email}`);

    if (!res.ok) return null;

    const accounts: AccountModel[] | null = await res.json();
    if (accounts?.length == 0) return null;

    return accounts;
  } catch (error) {
    return null;
  }
}

export async function updateAccount(account: AccountModel) {
  try {
    const res = await fetch(
      `${backendUrl}/update-account/${account.accountNumber}/`,
      {
        method: 'PUT',
        headers: defaultHeader,
        body: JSON.stringify(account),
      }
    );

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function findAccount(accountNumber: number) {
  try {
    const res = await fetch(
      `${backendUrl}/account/?accountNumber=${accountNumber}`
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function createAccountCreationRequest(request: AccountRequest) {
  try {
    await fetch(`${backendUrl}/create-acc-req/`, {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(request),
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function createChangePinRequest(request: ChangePinRequest) {
  try {
    await fetch(`${backendUrl}/create-change-pin-req/`, {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(request),
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function createMessage(message: MessageModel) {
  try {
    await fetch(`${backendUrl}/create-message/`, {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(message),
    });

    return true;
  } catch (error) {
    return false;
  }
}

export async function getMessages(receiver: string) {
  try {
    const res = await fetch(`${backendUrl}/messages/?receiver=${receiver}`);

    return res.json();
  } catch (error) {
    return null;
  }
}
